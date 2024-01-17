<template>
    <h3>Please Sign in to your Task Manager Account</h3>
        <form @submit.prevent="submit">
            <h4 class="h4 mb-3 fw-normal">Please sign in</h4>
            <input v-model ="data.name" type="text" class="form-control" id="floatingInput" placeholder="Name">
            <input v-model = "data.username" type="text" class="form-control" id="floatingInput" placeholder="Username">
            <input v-model = "data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <p v-if="err" v-text="error"></p>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
        <span>Already have a account ?</span>
        <button class="btn btn-primary w-100 py-2" type="submit"> <router-link to="/login" class="nav-link" aria-current="page">Login</router-link></button>

        <div class="card mt-4">
      <div class="card-header">
        *Please note that
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
      <li class="list-group-item">The password must have atleast 6 characters</li>
      <li class="list-group-item">Username must be unique and therefore if you are not able to sigin, try changing the username</li>
    </ul>
      </div>
    </div>

</template>

<script lang="ts">
import {reactive,ref} from "vue";
import { useRouter } from "vue-router";

export default{
    name: "SigninPage",
    setup(){
        const data = reactive({
            name:'',
            username:'',
            password:''
        });
        const error = '*Please check if your password and username are in correct format';
        const err = ref(false);

        const router = useRouter();
        const submit = async()=>{
            await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(resp => {
                    if (resp.status === 201) {
                        err.value = false;
                        router.push('/login')
                    } else {
                        err.value = true;
                        console.log("Status: " + resp.status)

                    }
            });

        }

        return{
            data,
            err,
            error,
            submit
        }
    }
}
</script>

<style>
h3{
    color: blueviolet;
    text-align: justify;
    margin-bottom: 1.5rem;
}
p{
    color: red;
    font-size: 0.8rem;
}
.form-signin {
    max-width: 330px;
    padding: 1rem;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
