(() => {
    const progress = document.querySelector('.scroll-progress');
    const bar = document.querySelector('.scroll-progress-bar');

    if (!progress || !bar) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let target = 0;
    let frame = 0;

    const paint = () => {
        bar.style.transform = `scaleX(${current})`;
        progress.setAttribute('aria-valuenow', String(Math.round(current * 100)));
    };

    const animate = () => {
        current += (target - current) * 0.16;

        if (Math.abs(target - current) < 0.001) {
            current = target;
            frame = 0;
            paint();
            return;
        }

        paint();
        frame = requestAnimationFrame(animate);
    };

    const updateProgress = () => {
        const scrollable = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        target = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

        if (reducedMotion.matches) {
            current = target;
            paint();
        } else if (!frame) {
            frame = requestAnimationFrame(animate);
        }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    reducedMotion.addEventListener?.('change', updateProgress);
    updateProgress();
})();
