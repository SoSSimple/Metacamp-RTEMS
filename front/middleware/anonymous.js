// me가 null이 아닐때 즉 로그인 되었을때
export default function ({ store, redirect }) {
  if (store.state.users.me) {
    redirect("/");
  }
}
