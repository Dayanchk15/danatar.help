/**
 * @SofiDev Esto es JSDOC, si consideras que puede ser complicado solo borralo, es un comentario, no afectará en nada
 * @typedef PortafolioData
 * @property {string} imgSrc Url de la imagen
 * @property {string} title Titulo de la tarjeta
 * @property {string[]} skills Array con tus habilidades ej: ['React', 'CSS', 'JavaScript']
 * @property {string} descripcion La descripcion de la tarjeta
 * @property {string} demoURL Url de una pagina de demostración
 * @property {string} repoURL Url del repositorio, ej: https://github.com/usuario/repo
 * @property {string} anim La animación que se ejecutará cuando se cargue la tarjeta, ej: fade-up, fade-right, fade-left, fade-down
 * @property {number} averageBrightness Cuanto brillo tendrá el color de fondo de la tarjeta, ej: 0.1
 */

/**
 * @SofiDev Esto es JSDOC, si consideras que puede ser complicado solo borralo, es un comentario, no afectará en nada
 * @type {PortafolioData[]}
 */
export const portafolioData = [
	{
		imgSrc: '/img/img/web_design.jpg',
		title: 'Веб‑дизайн',
		skills: ['React', 'CSS'],
		categories: ['web', 'design'],
		descripcion:
			'Создаём современные адаптивные сайты с чистым дизайном и удобной структурой, которые работают быстро и продают.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-right',
	},
	{
		imgSrc: '/img/img/seo_optimization.webp',
		title: 'SEO‑оптимизация',
		skills: ['JavaScript', 'Astro'],
		categories: ['seo', 'marketing'],
		descripcion:
			'Анализируем сайт, подбираем ключевые запросы, улучшаем структуру и контент, чтобы вы росли в поиске и получали органический трафик.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-up',
		averageBrightness: 0.1,
	},
	{
		imgSrc: '/img/img/online_marketing.jpg',
		title: 'Онлайн‑маркетинг',
		skills: ['React', 'Tailwind'],
		categories: ['marketing'],
		descripcion:
			'Строим комплексные рекламные кампании: соцсети, контекст, e‑mail. Помогаем выстроить воронку и сопровождение клиентов.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-left',
	},
	{
		imgSrc: '/img/img/bussines_awtomatization.jpg',
		title: 'Бизнес‑автоматизация',
		skills: ['Nodejs', 'MongoDB'],
		categories: ['automation', 'dev'],
		descripcion:
			'Автоматизируем рутинные процессы: заявки, отчёты, интеграции с CRM и мессенджерами, чтобы команда тратила меньше времени на ручную работу.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-up',
	},
	{
		imgSrc: '/img/img/graphic_design.webp',
		title: 'Графический дизайн',
		skills: ['CSS', 'Sass'],
		categories: ['design'],
		descripcion:
			'Разрабатываем бренд‑айдентику, логотипы, визуальные концепции для сайтов и соцсетей в едином стиле.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-left',
	},
	{
		imgSrc: '/img/img/print_design.jpg',
		title: 'Дизайн печатной продукции',
		skills: ['CSS', 'StyledComponents'],
		categories: ['design', 'print'],
		descripcion:
			'Макеты для визиток, буклетов, упаковки, наружной рекламы — готовые к печати файлы с аккуратной типографикой.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-right',
	},
	{
		imgSrc: '/img/img/website_design_development.png',
		title: 'Разработка дизайна сайта',
		skills: ['React', 'Tailwind'],
		categories: ['web', 'design'],
		descripcion:
			'Прорабатываем UX и UI под ваши задачи: прототипы, дизайн‑система, адаптивные макеты и передача в разработку.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-up',
	},
	{
		imgSrc: '/img/img/application_development.jpg',
		title: 'Разработка приложений',
		skills: ['React', 'Astro'],
		categories: ['dev'],
		descripcion:
			'Создаём веб‑приложения и личные кабинеты: от MVP до боевых версий с интеграциями и аналитикой.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-left',
	},
	{
		imgSrc: '/img/img/code_help.png',
		title: 'Помощь по коду',
		skills: ['JavaScript', 'CSS'],
		categories: ['dev', 'consult'],
		descripcion:
			'Помогаем с багами, рефакторингом и оптимизацией существующих проектов, даём рекомендации по архитектуре и стеку.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-right',
	},
	{
		imgSrc: '/img/img/consultation.jpg',
		title: 'Консультация',
		skills: ['Astro', 'React'],
		categories: ['consult'],
		descripcion:
			'Разбираем ваш проект, даём понятный план по развитию: от выбора технологий до маркетинга и аналитики.',
		demoURL: '',
		repoURL: '',
		anim: 'fade-up',
	},
];

const skillIcons = {
	JavaScript: 'skill-icons:javascript',
	React: 'skill-icons:react-dark',
	Astro: 'skill-icons:astro',
	CSS: 'skill-icons:css',
	Sass: 'skill-icons:sass',
	StyledComponents: 'skill-icons:styledcomponents',
	Bootstrap: 'skill-icons:bootstrap',
	Tailwind: 'skill-icons:tailwindcss-dark',
};

/**
 * @description Se mapea el portafolioData para que tenga los iconos de las habilidades
 * 	Puedes ver Array.map en https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
export const getPortafolioData = portafolioData.map((item) => {
	return {
		// Se coloca todo el contenido previo del item
		...item,
		// Se cambian las skills por los iconos correspondientes
		skills: item.skills.map((skill) => skillIcons[skill]),
	};
});
