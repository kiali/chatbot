import * as React from 'react';
import { Button, Tooltip } from '@patternfly/react-core';
import { SunIcon, MoonIcon } from '@patternfly/react-icons';
import { classes, style } from 'typestyle';

type ThemeSwitchProps = {
  theme: string;
  onChange: (theme: string) => void;
};
const Color100 = 'var(--pf-v5-global--Color--100)'

const Blue400 = 'var(--pf-v5-global--palette--blue-400)'
const Blue200 = 'var(--pf-v5-global--palette--blue-200)'
const Color400 = 'var(--pf-v5-global--Color--400)'

const iconStyle = style({
  color: Color100
});


const buttonStyle = style({
  fontSize: '1rem',
  $nest: {
    '&.pf-m-primary': {
      backgroundColor: Blue400,
      $nest: {
        '&::after': {
          border: `1px solid ${Blue200}`
        }
      }
    },
    '&.pf-m-secondary::after': {
      border: `1px solid ${Color400}`
    }
  }
});

const lightButtonStyle = style({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  $nest: {
    '&::after': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    '&&.pf-m-secondary::after': {
      borderRight: 0
    }
  }
});

const darkButtonStyle = style({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  $nest: {
    '&::after': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&&.pf-m-secondary::after': {
      borderLeft: 0
    }
  }
});

export const ThemeSwitchComponent: React.FC<ThemeSwitchProps> = (props: ThemeSwitchProps) => {
    const darkTheme = props.theme === "Dark";

    const handleTheme = (): void => {
        const theme = darkTheme ? "Light" : "Dark";
        props.onChange(theme)
        document.documentElement.classList.toggle('pf-v5-theme-dark');
    };

    return (
        <Tooltip position="bottom" content={'Switch Theme'}>
        <div>
            <Button
            variant={darkTheme ? 'secondary' : 'primary'}
            className={classes(buttonStyle, lightButtonStyle)}
            onClick={handleTheme}
            >
            <SunIcon className={iconStyle}></SunIcon>
            </Button>
            <Button
            variant={darkTheme ? 'primary' : 'secondary'}
            className={classes(buttonStyle, darkButtonStyle)}
            onClick={handleTheme}
            >
            <MoonIcon className={iconStyle}></MoonIcon>
            </Button>
        </div>
        </Tooltip>
    )

}