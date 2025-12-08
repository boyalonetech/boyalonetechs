import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Chatbot() {

  const router = useRouter();
  useEffect(() => {
    if (window.innerWidth > 768) {
      router.back();
    }
  });
  return (
    <section className="inset-0 w-screen h-screen relative">
      {/* Back Button - Positioned at top right */}
      {/* <button
        onClick={handleBack}
        className="absolute top-4 right-4 z-50 bg-blue-500/80 text-white  font-semibold py-2 px-4  border-gray-300 rounded-lg shadow-sm flex items-center gap-2 transition-all duration-200 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button> */}

      {/* White Overlay to cover iframe header area */}
      {/* <div className="absolute top-0 left-0 right-0 h-12 bg-white pointer-events-none z-40"></div> */}

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/xy2SmAzAEIynTm5df-QqZ"
          className="w-full h-full border-none"
          title="AI Chatbot"
        />

        {/* Overlay to cover "Powered by Chatbase" at bottom - adjust as needed */}
        <div className="absolute bottom-20 left-0 right-0 h-20 bg-white blur z-50 pointer-events-auto"></div>

        {/* CSS injection overlay */}
        <style>
          {`
              /* Target the iframe content */
              iframe {
                width: 100% !important;
                height: 100% !important;
                border: none !important;
              }
              
              /* This will affect the iframe content if same-origin */
              .PoweredBy_text__dM5H0,
              .PoweredBy_container__Jkj_3,
              [class*="PoweredBy"],
              footer {
                display: none !important;
                visibility: hidden !important;
              }

              /* Hide iframe header elements */
              iframe header,
              iframe .header,
              iframe .chat-header,
              iframe [class*="header"],
              iframe nav {
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                min-height: 0 !important;
                max-height: 0 !important;
                padding: 0 !important;
                margin: 0 !important;
                border: none !important;
              }
            `}
        </style>

        {/* JavaScript injection approach */}
        <script type="text/javascript">
          {`
              window.addEventListener('load', function() {
                // Try to access iframe content
                const iframe = document.querySelector('iframe');
                if (iframe && iframe.contentWindow) {
                  try {
                    const iframeDoc = iframe.contentWindow.document;
                    
                    // Hide powered by elements
                    const poweredByElements = iframeDoc.querySelectorAll('[class*="powered"], [class*="Powered"], footer, a[href*="chatbase"]');
                    poweredByElements.forEach(el => {
                      el.style.display = 'none';
                      el.style.visibility = 'hidden';
                    });
                    
                    // Hide header elements in iframe
                    const headerElements = iframeDoc.querySelectorAll('header, .header, .chat-header, [class*="header"], nav, .navbar, .nav-bar');
                    headerElements.forEach(el => {
                      el.style.display = 'none';
                      el.style.visibility = 'hidden';
                      el.style.height = '0';
                      el.style.minHeight = '0';
                      el.style.padding = '0';
                      el.style.margin = '0';
                      el.style.border = 'none';
                    });
                    
                    // Additional attempt to hide top elements
                    const topElements = iframeDoc.querySelectorAll('*');
                    topElements.forEach(el => {
                      const style = window.getComputedStyle(el);
                      const elTop = el.getBoundingClientRect().top;
                      if (elTop < 100 && (style.position === 'fixed' || style.position === 'absolute')) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                      }
                    });
                    
                  } catch (e) {
                    console.log('Cannot access iframe due to CORS');
                    
                    // Fallback: Try to inject styles into iframe
                    const style = document.createElement('style');
                    style.textContent = \`
                      header, .header, .chat-header, [class*="header"], nav, .navbar, .nav-bar {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        min-height: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                      }
                      body {
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                      }
                    \`;
                    
                    try {
                      iframe.contentWindow.document.head.appendChild(style);
                    } catch (err) {
                      console.log('Cannot inject styles due to CORS');
                    }
                  }
                }
              });
            `}
        </script>
      </div>
    </section>
  );
}
