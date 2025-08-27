import React, { useEffect, useRef, useState } from "react";
import { Chatbot, ChatbotAlert, ChatbotContent, ChatbotConversationHistoryNav, ChatbotDisplayMode,
    ChatbotFooter,
    ChatbotFootnote,
    ChatbotFootnoteProps,
     ChatbotHeader, ChatbotHeaderActions, ChatbotHeaderMain, ChatbotHeaderMenu, ChatbotHeaderOptionsDropdown, ChatbotHeaderSelectorDropdown, ChatbotHeaderTitle, ChatbotToggle, ChatbotWelcomePrompt, Conversation, Message, MessageBar, MessageBox, 
     } from "@patternfly/chatbot";
import { Bullseye, Brand, DropdownList, DropdownItem, DropdownGroup, Title, ExpandableSection, Stack, StackItem, Button} from '@patternfly/react-core';
import "./KialiChatBot.css";
import { CHAT_HISTORY_HEADER, FOOTNOTE_LABEL, REFERENCED_DOCUMENTS_CAPTION } from "../../Constants";
import {ExpandIcon, OpenDrawerRightIcon, OutlinedWindowRestoreIcon, SearchIcon, TimesIcon} from '@patternfly/react-icons';

/** Logos */

import KialiHorizontalLogoColor from '../../assets/img/horizontalLogoLight.svg';
import KialiHorizontalLogoReverse from '../../assets/img/horizontalLogoDark.svg';
import KialiconLogoColor from '../../assets/img/kiali-IconLogo-Color.svg';
import KialiIconLogoDark from '../../assets/img/kiali-Icon-Dark.svg';
import { useChatbot } from "../../useChatbot/useChatbot";
import { style } from "typestyle";
import { ModelAI } from "../../types/Models";
import { ExtendedMessage, Prompt } from "../../types";
import { ReferencedDocuments } from "../ReferencedDocuments/ReferencedDocuments";
export { ChatbotDisplayMode };

export interface ChatbotContext {
  username?: string | undefined;
  onDisplayChange?: (display: ChatbotDisplayMode) => void;
  debug?: boolean;
  model: ModelAI;
  view?: string;
  context?: any;
  prompts?: Prompt[];
}

const conversationList: { [key: string]: Conversation[] } = {};
conversationList[CHAT_HISTORY_HEADER] = [];

export const conversationStore: Map<string, ExtendedMessage[]> = new Map();

const footnoteProps: ChatbotFootnoteProps = {
  label: FOOTNOTE_LABEL,
};

const messageBar = style({    
    top: 0,
    left: 0,
    padding: 0,
    border: "none",
    height: "100%",
    width: "100%",
    position: "absolute",
    resize: "none",
    overflow: "hidden",
    font: "inherit",
    fontVariant: "inherit",
    fontStyle: "inherit",
    wordBreak: "break-word",
    background: "inherit",
})

const resetConversationState = () => {
  conversationList[CHAT_HISTORY_HEADER] = [];
  conversationStore.clear();
};

const findMatchingItems = (targetValue: string) => {
    let filteredConversations = Object.entries(conversationList).reduce(
        (acc: any, [key, items]) => {
        const filteredItems = items.filter((item) => {
            const target = targetValue.toLowerCase();
            if (target.length === 0) {
            return true;
            }
            const msgs = conversationStore.get(item.id);
            if (!msgs) {
            return false;
            } else {
            for (const msg of msgs) {
                if (msg.content?.toLowerCase().includes(target)) {
                return true;
                }
            }
            }
            return false;
        });
        if (filteredItems.length > 0) {
            acc[key] = filteredItems;
        }
        return acc;
        },
        {},
    );
    // append message if no items are found
    if (Object.keys(filteredConversations).length === 0) {
        filteredConversations = [
        { id: "13", noIcon: true, text: "No results found" },
        ];
    }
    return filteredConversations;
};

export const KialiChatBot: React.FunctionComponent<ChatbotContext> = (
  context,
) => {
    const {
    messages,
    setMessages,
    botMessage,
    isLoading,
    handleSend,
    alertMessage, 
    setAlertMessage,
    conversationId,
    setConversationId    
  } = useChatbot(context.model, context.username || "User");

    const welcomePrompts = context.prompts?.map((prompt) => ({
        title: prompt.title,
        message: prompt.message,
        onClick: () => handleSend(prompt.query, context.context),
    }));

    const [chatbotVisible, setChatbotVisible] = useState<boolean>(false);
    const [displayMode, setDisplayMode] = useState<ChatbotDisplayMode>(
        ChatbotDisplayMode.default,
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [conversations, setConversations] = useState<
        Conversation[] | { [key: string]: Conversation[] }
    >(conversationList);
    const ref = useRef(null)
    const historyRef = useRef<HTMLButtonElement>(null);
    const onSelectDisplayMode = (
        _event: React.MouseEvent<Element, MouseEvent> | undefined,
        value: string | number | undefined
    ) => {
        setDisplayMode(value as ChatbotDisplayMode);
        context.onDisplayChange && context.onDisplayChange(value as ChatbotDisplayMode)
    };
    
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(
        () =>
        // Fired on component mount (componentDidMount)
        () => {
            // Anything in here is fired on component unmount (componentWillUnmount)
            resetConversationState();
        },
        [],
    );

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    var horizontalLogo = (
        <Bullseye>
            <Brand className="show-light" src={KialiHorizontalLogoColor} alt="Kiali" />
            <Brand className="show-dark" src={KialiHorizontalLogoReverse} alt="Kiali" />
        </Bullseye>
    );

   

    const iconLogo = (
        <>
        <Brand className="show-light" src={KialiconLogoColor} alt="Kiali" />
        <Brand className="show-dark" src={KialiIconLogoDark} alt="Kiali" />
        </>
    );



    const setCurrentConversation = (
    newConversationId: string | undefined,
    newMessages: ExtendedMessage[],
  ) => {
    if (messages.length > 0 && conversationId) {
      const chatHistory = conversationList[CHAT_HISTORY_HEADER];
      let found = false;
      for (const chat of chatHistory) {
        if (chat.id === conversationId) {
          found = true;
          break;
        }
      }
      if (!found) {
        chatHistory.push({
          id: conversationId,
          text: messages[0].content || "<<empty>>",
        });
        setConversations(conversationList);
      }
      conversationStore.set(conversationId, messages);
    }
    if (newMessages !== messages) {
      setMessages(newMessages);
    }
    if (newConversationId !== conversationId) {
      setConversationId(newConversationId);
    }
  };

    return (
        <div ref={ref}>
            <ChatbotToggle
                tooltipLabel="Chatbot"
                isChatbotVisible={chatbotVisible}
                onToggleChatbot={() => setChatbotVisible(!chatbotVisible)}
                tooltipProps={{className: style({visibility: "hidden"})}}
            />
            <Chatbot isVisible={chatbotVisible} displayMode={displayMode}>
                <ChatbotConversationHistoryNav
                    displayMode={displayMode}
                    onDrawerToggle={() => {
                        setIsDrawerOpen(!isDrawerOpen);
                        setConversations(conversationList);
                    }}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    activeItemId="1"
                    onSelectActiveItem={(e, selectedId: any) => {
                        if (selectedId) {
                        const retrievedMessages = conversationStore.get(selectedId);
                        if (retrievedMessages) {
                            setCurrentConversation(selectedId, retrievedMessages);
                            setIsDrawerOpen(!isDrawerOpen);
                            setConversations(conversationList);
                        }
                        }
                    }}
                    conversations={conversations}
                    onNewChat={() => {
                        setIsDrawerOpen(!isDrawerOpen);
                        setCurrentConversation(undefined, []);
                    }}      
                    handleTextInputChange={(value: string) => {
                        if (value === "") {
                        setConversations(conversationList);
                        }
                        // this is where you would perform search on the items in the drawer
                        // and update the state
                        const newConversations: { [key: string]: Conversation[] } =
                        findMatchingItems(value);
                        setConversations(newConversations);
                    }}             
                    drawerContent={
                        <>
                            <ChatbotHeader>
                                <ChatbotHeaderMain>
                                    <ChatbotHeaderMenu 
                                        ref={historyRef}
                                        aria-expanded={isDrawerOpen}
                                        onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                                    />
                                    <ChatbotHeaderTitle
                                        displayMode={displayMode}
                                        showOnFullScreen={horizontalLogo}
                                        showOnDefault={iconLogo}
                                    />
                                </ChatbotHeaderMain>
                                <ChatbotHeaderActions>                                    
                                    <ChatbotHeaderOptionsDropdown onSelect={onSelectDisplayMode} tooltipProps={{content: '', className: style({visibility: "hidden"})}}>
                                        <DropdownGroup label="Display mode">
                                            <DropdownList>
                                                <DropdownItem
                                                value={ChatbotDisplayMode.default}
                                                key="switchDisplayOverlay"
                                                icon={<OutlinedWindowRestoreIcon aria-hidden />}
                                                isSelected={displayMode === ChatbotDisplayMode.default}
                                                >
                                                <span>Overlay</span>
                                                </DropdownItem>
                                                <DropdownItem
                                                value={ChatbotDisplayMode.docked}
                                                key="switchDisplayDock"
                                                icon={<OpenDrawerRightIcon aria-hidden />}
                                                isSelected={displayMode === ChatbotDisplayMode.docked}
                                                >
                                                <span>Dock to window</span>
                                                </DropdownItem>
                                                <DropdownItem
                                                value={ChatbotDisplayMode.fullscreen}
                                                key="switchDisplayFullscreen"
                                                icon={<ExpandIcon aria-hidden />}
                                                isSelected={displayMode === ChatbotDisplayMode.fullscreen}
                                                >
                                                <span>Full size</span>
                                                </DropdownItem>
                                                 <DropdownItem
                                                key="scloseChat"
                                                icon={<TimesIcon aria-hidden />}
                                                onClick={() => setChatbotVisible(!chatbotVisible)}
                                                >
                                                <span>Close Chat</span>
                                                </DropdownItem>
                                            </DropdownList>
                                         </DropdownGroup>
                                    </ChatbotHeaderOptionsDropdown>
                                </ChatbotHeaderActions>
                            </ChatbotHeader>
                            <ChatbotContent>
                                <MessageBox>
                                    <ChatbotWelcomePrompt
                                        title={"Hello " + context?.username}
                                        description="How may I help you today?"
                                        prompts={welcomePrompts}
                                    />
                                     {alertMessage && (
                                        <ChatbotAlert
                                        variant={alertMessage.variant}
                                        onClose={() => {
                                            setAlertMessage(undefined);
                                        }}
                                        title={alertMessage.title}
                                        >
                                        {alertMessage.message}
                                        </ChatbotAlert>
                                    )}                                   
                                    {(conversationId &&
                                       setCurrentConversation(conversationId, messages)) || <></>}
                                       {messages.map(
                                            (
                                                {
                                                    referenced_documents,
                                                    scrollToHere,
                                                    collapse,
                                                    ...message
                                                }: ExtendedMessage,
                                                index,
                                            ) => (
                                            <div key={`m_container_div_${index}`}>
                                                 {scrollToHere && (
                                                    <div
                                                        key={`scroll_div_${index}`}
                                                        ref={messagesEndRef}
                                                    />
                                                 )}
                                                {collapse ? (
                                                    <div key={`m_div_${index}`}>
                                                        <ExpandableSection toggleText="Show more">
                                                            <Message key={`m_msg_${index}`} {...message} isLoading={isLoading && !message.content}/>                                                            
                                                            <ReferencedDocuments key={`m_docs_${index}`} referenced_documents={referenced_documents} caption={REFERENCED_DOCUMENTS_CAPTION} />
                                                        </ExpandableSection>                                                        
                                                    </div>
                                                ): (
                                                     <div key={`m_div_${index}`}>
                                                        <Message key={`m_msg_${index}`} {...message} />
                                                        <ReferencedDocuments key={`m_docs_${index}`} referenced_documents={referenced_documents} caption={REFERENCED_DOCUMENTS_CAPTION} />                                                        
                                                    </div>
                                                )}
                                                </div>
                                        ))}
                                         {messages.at(-1)?.role === "user" && isLoading ? (
                                            <Message
                                                key="9999"
                                                isLoading={true}
                                                {...botMessage("....")}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                </MessageBox>
                            </ChatbotContent>
                            <ChatbotFooter>
                                <MessageBar 
                                    onFocus={() => setAlertMessage(undefined)}
                                    onSendMessage={handleSend}
                                    className={messageBar}
                                    alwayShowSendButton
                                    hasAttachButton={false}
                                    buttonProps={{
                                        send: {
                                            tooltipProps: {
                                                className: style({visibility: "hidden"})
                                            }
                                        }
                                    }}
                                />
                                <ChatbotFootnote {...footnoteProps} />
                            </ChatbotFooter>
                        </>
                    }
                />
            </Chatbot>
        </div>
    )
};

KialiChatBot.displayName = "KialiChatBot"