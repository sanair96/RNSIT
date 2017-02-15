(function(){
	var filesToCache = ['.','index.html','css/index.css','js/index.js'];

	var CACHE_NAME = 'rnscache';

	self.addEventListener('install',function(event){
		console.log('Installing Service Worker and Caching the page');
		event.waitUntil(
			caches.open(CACHE_NAME)
			.then(function(cache){
				cache.addAll(filesToCache);
			})
			);
		skipWaiting();
	});

	self.addEventListener('fetch',function(event){
		event.respondWith(
			caches.open(CACHE_NAME)
			.then(function(cache){
				return cache.match(event.request)
				.then(function(page){
					if(page)
						return page;
					return fetch(event.request)
					.then(function(page){
						cache.put(event.request,page.clone());
						return page;
					})
				})
			})
			.catch(function(err){
					console.log(err);
			})
			)
	});



})();