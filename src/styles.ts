// Import PatternFly CSS from node_modules.
// Thanks to rollup-plugin-postcss with `extract: false`,
// these imports will yield the CSS content as their default export string.

// Import PatternFly CSS from node_modules.
// Thanks to rollup-plugin-postcss with `extract: false`,
// these imports will yield the CSS content as their default export string.
import patternflyCoreCss from '@patternfly/react-core/dist/styles/base.css';
import patternflyChatbotCss from '@patternfly/chatbot/dist/css/main.css';
import patternflyCss from '@patternfly/patternfly/patternfly.css';

// Combine all CSS strings into a single one
const kialiChatbotCss = `
  ${patternflyCoreCss || ''}
  ${patternflyChatbotCss || ''}
  ${patternflyCss || ''}
`;

export default kialiChatbotCss;