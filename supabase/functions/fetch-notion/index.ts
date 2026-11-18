// Supabase Deno Edge Function: fetch-notion
// Reads published Notion page blocks via unofficial public loadPageChunk endpoint

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { pageUrl } = await req.json();
    if (!pageUrl) {
      return new Response(JSON.stringify({ error: "Missing pageUrl" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract 32-character Notion Page ID
    const match = pageUrl.match(/([a-f0-9]{32})/i) || pageUrl.match(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
    if (!match) {
      return new Response(
        JSON.stringify({
          error: "Invalid Notion URL. Please ensure page is public: Share -> Publish -> Share to web.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const pageId = match[1].replace(/-/g, "");

    // Request Notion public blocks chunk
    const notionRes = await fetch("https://www.notion.so/api/v3/loadPageChunk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Notion/2.1",
      },
      body: JSON.stringify({
        pageId,
        limit: 100,
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      }),
    });

    if (!notionRes.ok) {
      return new Response(
        JSON.stringify({
          error: "This Notion page isn't public. In Notion, tap Share -> Publish -> Share to web, or Export as Markdown & CSV and upload here.",
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await notionRes.json();
    const blockMap = data?.recordMap?.block || {};

    // Convert Notion blocks into plain Markdown format
    const markdownLines: string[] = [];

    for (const blockId in blockMap) {
      const block = blockMap[blockId]?.value;
      if (!block || !block.properties) continue;

      const title = block.properties.title?.[0]?.[0] || "";
      const type = block.type;

      if (type === "header") {
        markdownLines.push(`## ${title}`);
      } else if (type === "sub_header") {
        markdownLines.push(`### ${title}`);
      } else if (type === "to_do") {
        const isChecked = block.properties.checked?.[0]?.[0] === "Yes";
        markdownLines.push(`- [${isChecked ? "x" : " "}]  ${title}`);
      } else if (type === "bulleted_list") {
        markdownLines.push(`- ${title}`);
      } else if (type === "text" && title) {
        markdownLines.push(title);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        markdown: markdownLines.join("\n"),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err.message || "Failed to fetch Notion page blocks",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
