module.exports={
  "config": {
    "updateChannel": "stable",
    "fontSize": 12,
    "fontFamily": "\"Roboto Mono for Powerline\", Menlo, \"DejaVu Sans Mono\", Consolas, \"Lucida Console\", monospace",
    //"fontFamily": '"Roboto Mono for Powerline"',
    "cursorShape": "BLOCK",
    "cursorBlink": false,
    "cursorColor": '#839496',

    // terminal background color (hex)
    "backgroundColor": '#002b36',
    
    "foregroundColor": '#839496',

    // border color (window, tabs)
    "borderColor": '#073642',

    // custom css to embed in the main window
    "css": `
      .notifications_view {
        display: none;
      }
      .t_tab.t_active:before,
      .tab_tab.tab_active:before {
        border-color: #002b36 !important;
      }
    `,
    "termCSS": "",
    "showHamburgerMenu": "",
    "showWindowControls": "true",
    "padding": "12px 14px",
    "hyperColour": [
      "4532107"
    ],
    "colors":       
    ['#073642',
      '#dc322f',
      '#859900',
      '#b58900',
      '#268db2',
      '#d33682',
      '#2aa198',
      '#eee8d5',
      '#002b36',
      '#cb4b16',
      '#586e75',
      '#657b83',
      '#839496',
      '#6c71c4',
      '#93a1a1',
'#fdf6e3',],
    "shell": "",
    "shellArgs": [
      "--login"
    ],
    "env": {},
    "bell": "false",
    "copyOnSelect": false
  },
  "plugins": [
    
    ],
  "keymaps": {
    "window:devtools": "alt+o",
    "reload": "alt+o"
  }
}
