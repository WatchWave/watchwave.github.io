import GenerateSitemap from 'react-router-sitemap-maker';
import r from '../src/r';

const sitemapData = await GenerateSitemap(r(), {
	baseUrl: 'https://watchwave.github.io',
	hashrouting: true,
	changeFrequency: 'monthly',
});

sitemapData.toFile('./dist/sitemap.xml');
