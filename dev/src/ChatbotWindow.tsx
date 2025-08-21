import React, { useRef, useEffect } from 'react';
import { ChatbotDisplayMode, KialiChatBot } from '@kiali/chatbot';

export const PF6_THEME_CLASS_LIGHT = 'pf-v6-theme-light';
export const PF6_THEME_CLASS_DARK = 'pf-v6-theme-dark';

type ChatbotWProps = {
  username: string;
  theme: string;
  onDisplayChange?: (display: ChatbotDisplayMode) => void;
};

export const ChatbotWindow: React.FC<ChatbotWProps> = (props: ChatbotWProps) => {
  const getFrameWindow = () => window[0];
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={contentRef}
      style={{
        overflow: 'hidden', // Prevent internal scrollbars in this measuring div       
        display: 'block' // Can help with accurate width measurement
      }}
    >
      <KialiChatBot {...props} debug={true} models={[{"endpoint": "http://localhost:8080", model: "Kiali"}, {"endpoint": "http://gemma:8080", model: "Gemma"}]}/>
    </div>
  );
};
