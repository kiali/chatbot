import React, { useRef, useEffect } from 'react';
import { ChatbotDisplayMode, KialiChatBot, ModelAI, Prompt } from '@kiali/chatbot';
import { DataPrompts } from './DataPrompts';
export const PF6_THEME_CLASS_LIGHT = 'pf-v6-theme-light';
export const PF6_THEME_CLASS_DARK = 'pf-v6-theme-dark';

type ChatbotWProps = {
  username: string;
  theme: string;
  onDisplayChange?: (display: ChatbotDisplayMode) => void;
  view?: string;
  context?: any;
};

export const ChatbotWindow: React.FC<ChatbotWProps> = (props: ChatbotWProps) => {
  const getFrameWindow = () => window[0];
  const contentRef = useRef<HTMLDivElement>(null);

  const model: ModelAI = 
    { endpoint: "https://<server>/", 
      model: "Kiali", 
      credentials: {username: "<user>", password: "<password>"}
    };
  useEffect(
    function () {
      const them = props.theme;
      if (them) {
        const classList = getFrameWindow().document.getElementsByTagName('html')[0].classList;
        if (them === "Dark") {
          classList.remove(PF6_THEME_CLASS_LIGHT);
          classList.add(PF6_THEME_CLASS_DARK);
        } else if (them === "Light") {
          classList.remove(PF6_THEME_CLASS_DARK);
          classList.add(PF6_THEME_CLASS_LIGHT);
        } else {
          // default is 'system'
          classList.remove(PF6_THEME_CLASS_LIGHT, PF6_THEME_CLASS_DARK);
        }
      }
    },
    [props.theme]
  );


  const handlePromptClick = (prompt: Prompt) => {
    console.log("handlePromptClick", prompt.title);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 1000);
    });
  }

  return (
    <div
      ref={contentRef}
      style={{
        overflow: 'hidden', // Prevent internal scrollbars in this measuring div       
        display: 'block' // Can help with accurate width measurement
      }}
    >
      <KialiChatBot {...props} debug={true} model={model} prompts={DataPrompts[props.view || "overview"]}/>
    </div>  
  );
};
