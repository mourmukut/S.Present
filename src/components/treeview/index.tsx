import React, { useEffect, useState } from "react";
import toast from "@/util/toast";
import { getRandomNumber, getRedableDateFromISOString } from "@/util/helper";
import {  MenuItem, Paper } from "@mui/material";
import MyModal from "../my modal";
import { MyButton } from "../MyButton";
import { tree } from "@/types";
import Menu2 from "../menu2";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useDispatch, useSelector } from "react-redux";
import { setEditNode } from "@/lib/slices/data";
import { RootState } from "@/lib/store";
import { baseurl } from "@/util/url";

// const initialTreeData: tree[] = [
//   {
//     id: "1",
//     parentId: "0",
//     label: "Parent Node",
//     content: "",
//   },
// ];

function TreeViewComponent() {
  const [treeData, setTreeData] = useState<tree[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    getTreeChildrenApi("0", setTreeData);
  }, []);

  function openEditModal() {
    setEditModalOpen(true);
  }

  const dataState = useSelector((state: RootState) => state.data);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: 'auto'
        }}
      >
        <TreeViewCustom
          style={{
            outlineColor: "black",
            outlineWidth: 0,
            outlineStyle: "solid",
            margin: 20,
          }}
        >
          {treeData.map((node) => (
            <MyTreeItem
              openEditModal={openEditModal}
              key={node.id}
              nodeDefault={node}
            />
          ))}
          <MyButton
            title="Add Section"
            onClick={async () => {
              const success = await addChildNodeApi({
                id: getRandomNumber().toString(),
                parentId: "0",
                label: "Section Name",
                content: "Please add content here by clicking edit button!",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                autherId: dataState.user.id,
                autherName: dataState.user.email,
              });
              if (!success) return;
              getTreeChildrenApi("0", setTreeData);
            }}
          />
        </TreeViewCustom>
       
      </div>
      <MyModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
    </>
  );
}

function MyTreeItem({
  nodeDefault,
  openEditModal,
}: {
  nodeDefault: tree;
  openEditModal: () => void;
}) {
  const [node, setNode] = useState<tree>(nodeDefault);
  const [treeData, setTreeData] = useState<tree[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [closeMenu, setCloseMenu] = useState(getRandomNumber());

  const dispatch = useDispatch();
  const dataState = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (!dataState.editNode) return;
    if (dataState.editNode.id !== node.id) return;
    setNode(dataState.editNode);
  }, [dataState.editNode]);

  async function addChildNode(parentId: string) {
    setCloseMenu(getRandomNumber());
    const newChildNode = {
      id: parentId + (treeData.length + 1),
      parentId,
      label: "Section Name",
      content: "Please add content here by clicking edit button!",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      autherId: dataState.user.id,
      autherName: dataState.user.email,
    };

    const success = await addChildNodeApi(newChildNode);
    if (!success) return;
    setIsOpen(true);
    setTreeData([...treeData, newChildNode]);
  }

  async function onclickShowSections() {
    setCloseMenu(getRandomNumber());
    // e.stopPropagation()
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    const success = await getTreeChildrenApi(node.id, setTreeData);
    if (!success) {
      return;
    }
    setIsOpen(true);
    console.log("tree opened : ", node.id, node.parentId);
  }

  async function onclickDelete() {
    setCloseMenu(getRandomNumber());
    const success = await deleteNodeApi(node.id);
    if (!success) return;
    setHide(true);
  }

  async function onclickEdit() {
    setCloseMenu(getRandomNumber());
    openEditModal();
    dispatch(setEditNode(node));
  }

  if (hide) {
    return <></>;
  }

  return (
    <>
      <div className="group">
        <TreeItemCustom
          style={{
            margin: 5,
            // cursor : 'pointer'
          }}
          key={node.id}
          nodeId={node.id}
          label={node.label}
          updatedAt={node.updatedAt}
          autherName={node.autherName}
          content={node.content}
          menuComponent={
            <Menu2
              closeMenu={closeMenu}
              menuItemsCustom={
                <>
                  <MenuItem onClick={onclickShowSections}>
                    <ExpandCircleDownIcon />
                    show sections
                  </MenuItem>
                  {dataState.user.role !== "reader" && (
                    <>
                      <MenuItem
                        onClick={async () => await addChildNode(node.id)}
                      >
                        <AddIcon />
                        Add Section
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={onclickDelete}>
                        <DeleteIcon />
                        Delete
                      </MenuItem>
                      <MenuItem onClick={onclickEdit}>
                        <EditIcon />
                        Edit
                      </MenuItem>
                    </>
                  )}
                  <MenuItem
                    onClick={() => {
                      setCloseMenu(getRandomNumber());

                      setHide(true);
                    }}
                  >
                    <VisibilityOffIcon />
                    Hide
                  </MenuItem>
                </>
              }
            />
          }
          // onClick={onclickNode}
        >
          {isOpen &&
            treeData.map((childNode) => (
              <MyTreeItem
                openEditModal={openEditModal}
                key={childNode.id}
                nodeDefault={childNode}
              />
            ))}
          {/* <SpeedDial /> */}

          {/* <div className="">
            <MyButton
              title="Add Section"
              onClick={async () => await addChildNode(node.id)}
            />
            <MyButton
              title={`${isOpen ? "Hide" : "Show"} Sections`}
              onClick={onclickShowSections}
            />
            <MyButton title="Delete" onClick={onclickDelete} />
            <MyButton title="Hide" onClick={() => setHide(true)} />
            <MyButton title="Edit" onClick={onclickEdit} />
          </div> */}
        </TreeItemCustom>
      </div>
    </>
  );
}

function TreeItemCustom({
  style,
  nodeId,
  label,
  updatedAt,
  autherName,
  content,
  onClick,
  children,
  menuComponent,
}: {
  style: React.CSSProperties | undefined;
  nodeId: string;
  label: string;
  content: string;
  updatedAt: string,
  autherName: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
  menuComponent: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          ...style,
          marginLeft: 20,
          marginTop: 5,
          marginBottom: 5,
          paddingLeft: 10,
          borderLeftWidth: 1,
          borderLeftColor: "black",
          borderLeftStyle: "solid",
        }}
        className="tree"
        onClick={onClick}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <span className="font-bold">{`${label}`}</span>
          </div>
          <div>{menuComponent}</div>
        </div>
        <div style={{
          width : '100%',
          display : 'flex',
          alignItems : 'flex-end',
          flexDirection : 'row'
        }}>
          <span style={{
            color: '#88909e',
            marginRight: 5
          }}>
            {"Author -"}
          </span>
          <span style={{
            fontWeight : 'bold'
          }}>
            {`${autherName} `}
          </span>
          <span style={{
            color: '#88909e',
            marginLeft : 10,
            marginRight: 5
          }}>
            {"Last Updated -"}
          </span>
          <span style={{
            // fontSize : 12,
            color: '#88909e',
          }}>
            {getRedableDateFromISOString(updatedAt)}
          </span>
        </div>
        <Paper elevation={3} component={() => <p>{`${content}`}</p>} />
        {/* <p>{`${content}`}</p> */}
        {children}
      </div>
    </>
  );
}

function TreeViewCustom({
  style,
  children,
}: {
  style: React.CSSProperties | undefined;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}

async function addChildNodeApi(node: tree) {
  try {
    const res = await fetch(`${baseurl}/trees`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(node),
    });
    const data = await res.json();
    toast("Node added successfully");
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error adding node : ", error);
    toast(String(error));

    return null;
  }
}

async function getTreeChildrenApi(
  nodeid: string,
  setter: React.Dispatch<React.SetStateAction<tree[]>>
) {
  try {
    const res = await fetch(`${baseurl}/trees?parentId=${nodeid}`);
    const data = (await res.json()) as tree[];
    if (!data.length) {
      toast("No sections found!");
      return null;
    }
    setter(data);
    // console.log("data", data);
    // toast("Node added successfully")
    return data;
  } catch (error) {
    console.log("Error adding node : ", error);
    toast(String(error));
    return null;
  }
}

async function deleteNodeApi(nodeid: string) {
  try {
    const res = await fetch(`${baseurl}/trees/${nodeid}`, {
      method: "delete",
    });
    const data = (await res.json()) as tree[];
    toast("Node deleted successfully");
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error adding node : ", error);
    toast(String(error));
    return null;
  }
}

export default TreeViewComponent;
