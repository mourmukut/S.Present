import { Button } from "@mui/material";

export function MyButton({ title, onClick }: { title: string; onClick: () => void }) {
    return (
      <>
        <Button
          onClick={onClick}
          className="m-1 text-white bg-black"
          variant="contained"
        >{`${title}`}</Button>
      </>
    );
  }