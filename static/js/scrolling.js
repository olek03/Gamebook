const posts = document.querySelectorAll(".postframe")

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
}, {
    threshold: 0
})

posts.forEach(post => {
    observer.observe(post)
})
