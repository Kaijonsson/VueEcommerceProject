<template>
    <div class="success-container">
        <div class="success-items">
            <b-icon icon="check-circle-fill" scale="5" variant="success" class="cartIcon" ></b-icon>
        <p>Order placed successfully</p>    
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.success-container {
    display: flex;
    justify-content: center;
    width: 50%;
    border: 1px solid;
    height:  250px;
    margin: auto;
    margin-top: 8%;
    align-items: center;
}
.success-items > p {
    margin-top: 60px
}
</style>