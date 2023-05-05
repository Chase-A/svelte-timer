<script>
    import Marquee from "svelte-fast-marquee";


    const images = 100;
    const rows = 18;
</script>




<h1>marquee here, move only on scroll?</h1>
<body>
    <div class="container">
        {#each Array(rows).fill().map((_, i) => i) as number}
            <div class="{number % 2 === 0 ? 'wrap-left' : 'wrap-right'}">
                <Marquee speed={1} direction={number % 2 === 0 ? 'right': 'left'}>
                    {#each Array(images).fill().map((_, i) => i) as number}
                        <img src="favicon.png" alt="">
                    {/each}
                </Marquee>
            </div>
    
        {/each}
    </div>
</body>



<style>
    body {
        overflow: hidden;
        padding: 0;
        margin: 0;
    }

    img {
        height: 50px;
        width: 50px;
        padding: 10px;
        opacity: 15%;
    }
    .wrap-left {
        animation: moveLeft 1s forwards;
    }
    .wrap-right {
        animation: moveRight 1s forwards;
    }
    .container {
        transform: rotate(10deg);
    }

    :global(.marquee-container) {
        overflow-x: visible !important;
    }

    @keyframes moveRight {
        from {
            transform: translateX(-200px);
        }
        to {
            transform: translateX(0px)
        }
}
    @keyframes moveLeft {
        from {
            transform: translateX(200px);
        }
        to {
            transform: translateX(0px)
        }
}

</style>