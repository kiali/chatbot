import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '@patternfly/react-core';
import { ChatbotWindow, PF6_THEME_CLASS_DARK, PF6_THEME_CLASS_LIGHT } from './ChatbotWindow';
import { ChatbotDisplayMode, kialiChatbotCss } from '@kiali/chatbot';

const CHATBOT_CSS_PUBLIC_URL = '/Chatbot.css';

// Define max sizes to prevent the iframe from getting excessively large
const MAX_IFRAME_VIEWPORT_WIDTH_PERCENT = 0.95; // Max 95% of screen width
const MAX_IFRAME_VIEWPORT_HEIGHT_PERCENT = 0.95; // Max 95% of screen height

type ChatbotProps = {
  username: string;
  theme: string;
  view?: string;
  context?: any;
};

export const ChatbotAI: React.FC<ChatbotProps> = (props: ChatbotProps) => {

  const chatbotFrameRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<ChatbotDisplayMode>(ChatbotDisplayMode.default);
  const [heightIframe, setHeightIframe] = useState<number | "auto">("auto")
  const [widthIframe, setWidthIframe] = useState<number | "auto">("auto")
  // State to store the dynamic dimensions received from the iframe
  const [iframeContentDimensions, setIframeContentDimensions] = useState({ width: 0, height: 0 });

  const injectStyles = () => {
    //const chatbot_style_element = document.createElement('style');
    const chatbot_style_element = document.createElement('style');
    chatbot_style_element.textContent = kialiChatbotCss;
    chatbotFrameRef.current?.contentWindow?.document.head.appendChild(chatbot_style_element);
    const htmlTag = chatbotFrameRef.current?.contentWindow?.document.documentElement;
    if (htmlTag) {
      const them = props.theme;
      htmlTag.classList.add(them === "Dark" ? PF6_THEME_CLASS_DARK : PF6_THEME_CLASS_LIGHT);
    }
  };

  const sendChatbotState = () => {
    sendMessage(props?.username);
  };

  // Function to send messages from the parent to the iframe (if needed)
  const sendMessage = (message: string) => {
    const www = chatbotFrameRef.current?.contentWindow;
    if (www) {
      www.postMessage(JSON.stringify(message), '*'); // IMPORTANT: Change '*' to target origin
    }
  };

  const chatbotLoadCompleted = () => {
    injectStyles();
    setLoading(false);
    sendChatbotState();
  };

  const adjustDisplay = (display: ChatbotDisplayMode) => {
    setDisplayMode(display);
    if(display === ChatbotDisplayMode.docked) {
      // You can set a default docked size here, or rely on iframe content dimensions
      // For a fixed docked height, you might set a specific pixel value
      setHeightIframe(700 * MAX_IFRAME_VIEWPORT_HEIGHT_PERCENT);
      setWidthIframe('auto'); // Let content determine width or set a fixed width
    } else if(display === ChatbotDisplayMode.fullscreen){
      setHeightIframe(700 * MAX_IFRAME_VIEWPORT_HEIGHT_PERCENT);
      setWidthIframe(1400 * MAX_IFRAME_VIEWPORT_WIDTH_PERCENT);
    }
    else {
      // Handle "minimized" or other states if needed
      setHeightIframe('auto');
      setWidthIframe('auto');
    }
  }

  return (
    <div
      style={{
        position: 'fixed', // Position fixed to the viewport       
        bottom: '20px',
        top: "75px",
        height: "90%",
        right: '0px', // Distance from the right of the viewport
        zIndex: 9999, // A very high z-index to ensure it's on top of other elements
      }}
      // Allow clicking on the overlay (outside the iframe) to close the modal
    >
      {loading ? <Spinner /> : <></>}
      <iframe
        title="Kiali Chatbot IFrame"
        srcDoc="<!DOCTYPE html>"
        ref={chatbotFrameRef}
        onLoad={chatbotLoadCompleted}
        {...props}
        style={{
          minWidth: '480px', // Set a minimum width for the iframe
          minHeight: '450px', // Set a minimum height for the iframe
          width: widthIframe === "auto" ? `${iframeContentDimensions.width}px` : widthIframe,
          height: "100%",         
          backgroundColor: 'transparent',
          border: '0px', // Remove default iframe border         
          padding: '0px',
          margin: '0px', // Remove any unwanted margins or padding
          // If content still exceeds the iframe's calculated size (due to max limits), allow internal scrolling
          overflow: 'auto',
          display: loading ? 'none' : 'block' // Hide the iframe while loading
        }}
        // Add `sandbox` attributes for security. Customize permissions as needed.
        // `allow-scripts` is needed for React, `allow-same-origin` for postMessage.
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        // Prevent clicks on the iframe itself from bubbling up and closing the modal via the overlay's onClick
        onClick={e => e.stopPropagation()}
      >
        {chatbotFrameRef.current !== null &&
          ReactDOM.createPortal(
            <ChatbotWindow username={props.username} theme={props.theme} onDisplayChange={adjustDisplay} view={props.view} context={props.context}/>,
            // @ts-expect-error IFrame for chatbot must exist
            chatbotFrameRef.current?.contentWindow.document.body
          )}
      </iframe>
    </div>
  );
};