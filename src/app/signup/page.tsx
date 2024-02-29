import CheckForLogin from "@/components/check for login";
import Signup from "@/components/signup";

export default function () {
  return (
    <>
      <CheckForLogin forLoginPage={true}>
        <Signup />
      </CheckForLogin>
    </>
  );
}
