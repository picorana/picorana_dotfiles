set modeline
set modelines=1

filetype off
execute pathogen#infect()
execute pathogen#helptags()
syntax enable
filetype plugin indent on

" search
set incsearch 	" search incrementally
set hlsearch 	" highlight while searching

" tabs/spaces {{{
set expandtab
set tabstop=4
set shiftwidth=4
" }}}

" UI / colors {{{

" colorscheme
set background=dark
colorscheme solarized

set showmatch 	" shows matching parenthesis
set number 	" shows line number
set ruler	" show file stats
set showcmd	" show command in bottom bar
set cursorline 	" highlight current line
set wildmenu	" visual autocomplete for command menu
set lazyredraw	" redraw only when need to

" }}} 

" pymode {{{
let g:pymode_folding = 0
let g:pymode_options_max_line_length=120
autocmd FileType python set colorcolumn=120
" }}}

" javascript {{{

" use prettier for formatting 
autocmd FileType javascript set formatprg=prettier\ --stdin

" autoformat when saving
autocmd BufWritePre *.js :normal gggqG

" }}}

" simplyfold {{{
let g:SimpylFold_fold_docstring = 1
" }}}

" folding {{{
set foldenable	" enable folding
set foldlevelstart=10	" open most folds by default
set foldnestmax=99	" 10 nested folds max
set foldmethod=indent	" fold based on indent level
nnoremap <space> za	" space opens/closes folds
" }}}

" movement {{{

" move vertically by visual line
nnoremap j gj
nnoremap k gk

" move to the beginning/end of line
nnoremap B ^
nnoremap E $

" $/^ doesn't do anything
nnoremap $ <nop>
nnoremap ^ <nop>

" }}}

" keybindings {{{
inoremap jk <esc>
" }}}

" backup files {{{
set backup
set backupdir=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
set backupskip=/tmp/*,/private/tmp/*
set directory=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
set writebackup
" }}}

" list of plugins in use {{{
" SimplyFold        manages folds nicely
" vim-commentary    comment multiple lines {{{
" gc5   comment following 5 lines
" gcc   comment current line
" gcap  comment out a paragraph
" :7,17Commentary   comment a range of lines
" }}}
" YouCompleteMe     autocompletion plugin
" python-mode       suite of helpful stuff for python
" vim-solarized8 
" vim-colors-solarized 
" }}}

" vim:foldmethod=marker:foldlevel=0
