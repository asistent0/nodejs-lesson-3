# nodejs-lesson-3
Lesson 3

1 часть задания, собрать информацию с сайта.
запускается командой 

    > node server.js

или, так же может запускаться командой:

    > npm run server

и после нужно открыть в браузере страницу по адресу <http://localhost:8000/>.

При выполнении задания возникли некоторые трудности с которыми не смог справиться. 
Хотел взять информацию со своего местного сайта, но почему то возникли проблемы с кодировкой, пробовал менять, все равно ничего не получается.
На самом сайте стоит кодировка "windows-1251" ставил у себя такую кодировку выдает иероглифы на подобии:

ЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ

Ставил "utf-8" появляются знаки вопроса вместо непонятных символов.
Файл с данной проблемой прилагается, можно запустить командой:

    > node server2.js

и открыть в браузере тот же адрес.
