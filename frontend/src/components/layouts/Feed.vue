<template>
    <section>
        <article>Feed</article>
    </section>
</template>

<script>
export default {
    name: 'Feed'
}
</script>

<style scoped>
    section{
        width: 95%;
        margin-top: 20px
    }

    article{
        width: 100%;
        background-color: #333;
        margin-bottom: 15px;
        padding: 5px;
    }

    @media screen and (min-width: 1024px) {
        section{
            width: 67%;
            margin-top: 0px
        }

        .article__header{
            display: flex;
            align-items: center;
        }

        .article__avatar{
            width: 40px;
            height: 40px;
        }

        .article__date{
            flex: 1;
            text-align: right;
        }

        .article__title{
            margin-top: 0; 
        }

        .article__img{
            text-align: center;
        }

        .article__img img{
            max-height: 350px;
            margin: auto;
        }

        .article__footer button{
            line-height: 30px;
            font-size: 1rem;

        }

        .btn-rate{
            width: 70px;
        }

        .btn-rate--top{
            background-color: #a3ebc5;
        }

        .btn-rate--flop{
            background-color: #ef6262;
        }
    }
</style>