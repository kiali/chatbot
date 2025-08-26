import * as React from 'react';
import {
  Page,
  Flex,
  FlexItem,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  NavItem,
  PageSection,
  PageSidebar,
  PageToggleButton,
  ButtonVariant,
  PageSidebarBody,
  Toolbar,
  ToolbarItem,
  Nav,
  NavList,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons';
import kialiLogoDark from './logo-darkbkg.svg';
import { ChatbotAI } from '../Chatbot';
import { ThemeSwitchComponent } from './ThemeSwitch';
import { Overview } from './Overview';
import { GraphView as Graph } from './Graph';
import { dataContext } from './DataContext';

export const MASTHEAD_HEIGHT = '76px';

export const MockUpKiali: React.FC = (props) => {
    const [theme, setTheme] = React.useState<string>('Light');
    const [activeMenu, setActiveMenu] = React.useState<'Overview' | 'Graph'>('Overview');
  

    const masthead = (
    <Masthead role="kiali_header" style={{ height: MASTHEAD_HEIGHT }}>
      <MastheadToggle>
        <PageToggleButton
          variant={ButtonVariant.plain}
          aria-label="Kiali navigation"
          isSidebarOpen={true}
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand component={props => <a {...props} to="#" />}>
          <img src={kialiLogoDark} alt="Kiali Logo" />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent style={{ height: MASTHEAD_HEIGHT }}>
        <Toolbar>
            <ToolbarItem>
                <Flex>
                    <FlexItem>
                        <ThemeSwitchComponent theme={theme} onChange={setTheme}/>
                    </FlexItem>
                </Flex>
            </ToolbarItem>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const Sidebar = (
    <PageSidebar style={{ width: '210px' }} isSidebarOpen={true}>
      <PageSidebarBody>
        <Nav>
            <NavList>
                  <NavItem isActive={activeMenu === 'Overview'} onClick={() => setActiveMenu('Overview')}>Overview</NavItem>
                  <NavItem isActive={activeMenu === 'Graph'} onClick={() => setActiveMenu('Graph')}>Graph</NavItem>
            </NavList>
        </Nav>      
      </PageSidebarBody>
    </PageSidebar>
  );


return (
    <Page
        header={masthead}
        sidebar={Sidebar}
    >
            <PageSection isFilled>
              {activeMenu === 'Overview' ? <Overview/> : <Graph/>}
              <ChatbotAI username={"Kiali User"} theme={theme} view={activeMenu} context={activeMenu === 'Overview' ? dataContext.Overview : dataContext.Graph}/>
            </PageSection>
    </Page>
)


}