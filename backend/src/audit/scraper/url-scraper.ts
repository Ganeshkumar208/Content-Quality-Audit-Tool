// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { JSDOM } from 'jsdom';
// import { Readability } from '@mozilla/readability';

// export async function scrapeUrl(url: string) {
//     const { data: html } = await axios.get(url);

//     const dom = new JSDOM(html);
//     const reader = new Readability(dom.window.document);
//     const article = reader.parse();

//     const $ = cheerio.load(html);

//     const title = $('title').text() || article?.title || "";
//     const metaDesc = $('meta[name="description"]').attr('content') || "";
//     const metaKeywords =
//         $('meta[name="keywords"]').attr('content')?.split(',') || [];

//     const headings = [];
//     $('h1, h2, h3').each((_, el) => {
//         headings.push($(el).text().trim());
//     });

//     return {
//         content: article?.textContent || "",
//         title,
//         metaDesc,
//         metaKeywords,
//         headings,
//     };
// }













// src/audit/scrapers/playwright.scraper.ts
import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

@Injectable()
export class PlaywrightScraper {
    async scrape(url: string) {
        const browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            viewport: { width: 1920, height: 1080 }
        });

        const page = await context.newPage();

        try {
            // Set longer timeout and use different wait strategy
            await page.goto(url, {
                timeout: 45000, // 45 seconds
                waitUntil: 'domcontentloaded' // Faster than 'networkidle'
            });

            // Wait for main content to load
            await page.waitForSelector('body', { timeout: 10000 });

            // Extract structured content
            const result = await page.evaluate(() => {
                const getText = (selector: string) =>
                    Array.from(document.querySelectorAll(selector))
                        .map(el => el.textContent?.trim())
                        .filter(text => text && text.length > 10) as string[];

                // Try multiple selectors for title
                const titleSelectors = [
                    'h1',
                    '[data-testid="storyTitle"]',
                    'article h1',
                    '.pw-post-title',
                    'header h1'
                ];

                let title = '';
                for (const selector of titleSelectors) {
                    const element = document.querySelector(selector);
                    if (element?.textContent?.trim()) {
                        title = element.textContent.trim();
                        break;
                    }
                }

                return {
                    title: title || document.title,
                    headings: [
                        ...getText('h1'),
                        ...getText('h2'),
                        ...getText('h3'),
                    ],
                    bold: getText('b, strong'),
                    paragraphs: getText('p'),
                    bullets: getText('ul li, ol li'),
                    fullText: document.body.innerText?.trim() || '',
                };
            });

            await browser.close();
            return result;

        } catch (error) {
            await browser.close();
            throw new Error(`Failed to scrape URL: ${error.message}`);
        }
    }
}









// // src/audit/scrapers/playwright.scraper.ts
// import { Injectable } from '@nestjs/common';
// import { chromium } from 'playwright';

// @Injectable()
// export class PlaywrightScraper {
//     async scrape(url: string) {
//         const browser = await chromium.launch({
//             headless: true,
//         });

//         const page = await browser.newPage();

//         await page.goto(url, { waitUntil: 'networkidle' });

//         // Extract structured content
//         const result = await page.evaluate(() => {
//             const getText = (selector: string) =>
//                 Array.from(document.querySelectorAll(selector))
//                     .map(el => el.textContent?.trim())
//                     .filter(Boolean) as string[];

//             return {
//                 title: document.querySelector('h1')?.textContent?.trim() || '',
//                 headings: [
//                     ...getText('h1'),
//                     ...getText('h2'),
//                     ...getText('h3'),
//                 ],
//                 bold: getText('b,strong'),
//                 paragraphs: getText('p'),
//                 bullets: getText('ul li'),
//                 numbers: getText('ol li'),
//                 fullText: document.body.innerText.trim(),
//             };
//         });

//         await browser.close();

//         return result;
//     }
// }
