// app/api/proxy-event/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const targetUrl = 'https://gevents.gitam.edu/registration/NjU2Mg==';

    try {
        // 1. Fetch the external HTML
        const response = await fetch(targetUrl);
        let html = await response.text();

        // 2. The Regex Logic (Translated from Dart)
        // Dart: r'"captchainputcode"\s*:\s*\{\s*required:\s*true'
        const regex = /"captchainputcode"\s*:\s*\{\s*required:\s*true/g;

        // Find the match to replicate your specific Dart logic
        // (In JS replace, we can just target the regex directly)

        // 3. Modify the HTML (The Captcha Bypass)

        // Replace the JS Validation function
        html = html.replace(
            `function ValidateCaptcha() {
    var string1 = removeSpaces(cd);
    var string2 = removeSpaces($('#UserCaptchaCode').val());
    if (string1 == string2) {
      return true;
    } else {
      return false;
    }
  }`,
            `function ValidateCaptcha() {
    return true;
  }`
        );

        // Replace the specific regex match (changing true to false)
        html = html.replace(regex, (match) => {
            return match.replace("true", "false");
        });

        // 4. CRITICAL: Inject <base> tag
        // Without this, relative links (like <link href="/css/style.css">) 
        // will try to load from localhost:3000 and fail.
        const baseTag = `<base href="https://gevents.gitam.edu/">`;
        html = html.replace('<head>', `<head>${baseTag}`);

        // 5. Inject Custom Script to handle Redirects (Replaces onLoadStart)
        // We inject a script that posts a message to the parent window when URL changes
        const redirectScript = `
      <script>
        // Check URL on load
        if (window.location.href.includes('responsepaytm')) {
           window.parent.postMessage({ type: 'PAYMENT_COMPLETE', url: window.location.href }, '*');
        }
      </script>
    `;
        html = html.replace('</body>', `${redirectScript}</body>`);

        // Return the modified HTML
        return new NextResponse(html, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error) {
        return new NextResponse('Error fetching page', { status: 500 });
    }
}