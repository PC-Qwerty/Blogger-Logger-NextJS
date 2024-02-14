import {
  actionsExample,
  createPostAction,
  deletePostAction,
} from "@/lib/actions";

export default function ServerActionTest() {
  const example = async () => {
    "use server";
    console.log("Inside Component Itself");
    // when the button is clicked it calls this server action function and this is done through an API call from the brower(client-side) and this is a POST request from browser
  };
  return (
    <div>
      <form action={createPostAction}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="body" name="body" />
        <input type="text" placeholder="image" name="image" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="userId" name="userId" />
        <button>Test</button>
      </form>
      <form action={deletePostAction}>
        <input type="text" placeholder="postId" name="postId" />
        <button>Delete</button>
      </form>
    </div>
  );
}
