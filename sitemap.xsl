<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - Opiyo Nickson Portfolio</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e2e8f0;
            padding: 40px 20px;
            min-height: 100vh;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #1e293b;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid #334155;
          }
          
          h1 {
            color: #00ff51;
            margin-bottom: 10px;
            font-size: 28px;
          }
          
          .subtitle {
            color: #94a3b8;
            margin-bottom: 30px;
            font-size: 14px;
          }
          
          .sitemap-info {
            background: #0f172a;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #00ff51;
          }
          
          .sitemap-info p {
            margin: 8px 0;
            font-size: 14px;
            line-height: 1.6;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          
          thead {
            background: #0f172a;
          }
          
          th {
            padding: 15px;
            text-align: left;
            color: #00ff51;
            font-weight: 600;
            border-bottom: 2px solid #00ff51;
            font-size: 13px;
          }
          
          td {
            padding: 15px;
            border-bottom: 1px solid #334155;
            font-size: 13px;
          }
          
          tr:hover {
            background: #0f172a;
          }
          
          a {
            color: #00ff51;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.3s ease;
          }
          
          a:hover {
            color: #00cc41;
            text-decoration: underline;
          }
          
          .priority {
            background: #1e3a1f;
            color: #86efac;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .changefreq {
            background: #1e2d3d;
            color: #7dd3fc;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #334155;
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
          }
          
          .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #00ff51;
            color: #0f172a;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .back-link:hover {
            background: #00cc41;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 255, 81, 0.3);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🗺️ Sitemap</h1>
          <p class="subtitle">Opiyo Nickson - Software Developer Portfolio</p>
          
          <div class="sitemap-info">
            <p><strong>Total URLs:</strong> <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
            <p><strong>Last Updated:</strong> <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></p>
            <p><strong>Purpose:</strong> This sitemap helps search engines discover and index all pages on this website.</p>
          </div>
          
          <xsl:if test="count(sitemap:urlset/sitemap:url) > 0">
            <table>
              <thead>
                <tr>
                  <th>Page URL</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td>
                      <span class="changefreq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>
          
          <div class="footer">
            <p>This sitemap is automatically generated and submitted to Google Search Console for indexing.</p>
            <a href="/" class="back-link">← Back to Portfolio</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>