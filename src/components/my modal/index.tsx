import * as React from 'react';
import { MyButton } from '../MyButton';
import EditSection from '../edit section';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const style = {
  position: 'absolute' as 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: '90%',
  backgroundColor: 'white',
  border: '2px solid #000',
  borderRadius: 20,
  marginTop: 20,
  placeSelf: 'center',
  padding : 20,
  zIndex:999,
};

export default function ({
  isOpen,
  onClose
}:{
  isOpen: boolean
  onClose: ()=>void
}) {
  const [open, setOpen] = React.useState(false);

  const dataState = useSelector((state: RootState) => state.data);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose()
  }

  React.useEffect(()=>{
    console.log("isopen : ",isOpen)
    setOpen(isOpen)
  },[isOpen])

  if(!isOpen){
    return <></>
  }

  return (
      <>
      <div style={{
        position: 'absolute' as 'absolute',
        top : 0,
        height : '100%',
        width : '100%',
        backgroundColor: 'rgba(0,0,0,.5)',
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : 'black'
      }}>

      </div>
      <div style={style}>
            <EditSection handleClose={handleClose} node={dataState.editNode} />
            <MyButton onClick={handleClose} title='close'/>
            {/* <MyButton onClick={handleClose} title='save'/> */}
      </div>
      </>
  );
}