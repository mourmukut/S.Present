import CheckForLogin from "@/components/check for login";
import Profile from "@/components/profile";

export default function () {
  return (
    <>
      <CheckForLogin >
        <Profile />
      </CheckForLogin>
    </>
  );
}
