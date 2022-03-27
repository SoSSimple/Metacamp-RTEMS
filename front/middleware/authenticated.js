// me가 null일때 즉 로그인이 안되었을때
export default function ({ store, redirect }) {
  if (!store.state.users.me) {
    redirect("/");
  }
}
