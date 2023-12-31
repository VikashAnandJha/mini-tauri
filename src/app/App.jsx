'use client'
import { List, Space, Input, Button, Avatar, Divider, Flex, Radio, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'

import {
    EditTwoTone
} from '@ant-design/icons';
import WindowControls from './WindowControls';

import { createDir, BaseDirectory, existsSync, writeTextFile, exists, readTextFile } from '@tauri-apps/api/fs';
import { desktopDir } from '@tauri-apps/api/path';

import { appWindow } from '@tauri-apps/api/window';
import TextArea from 'antd/es/input/TextArea';
const bookTitles = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984",
    "The Catcher in the Rye",
];
function App() {
    const [notesList, setNotesList] = useState(bookTitles)
    const [currentTitle, setCurrentTitle] = useState('blank')
    const [open, setOpen] = useState(false);

    const [textAreaInput, settextAreaInput] = useState('')
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleNewNotes = () => {

        console.log(currentTitle);
        // Avoid modifying the original array in place
        setNotesList((prevNotesList) => [currentTitle, ...prevNotesList]);
        // Clear the input field after adding a note
        // setCurrentTitle('');

        console.log(notesList);
    }

    async function check() {
        const desktopPath = await desktopDir();

        console.log(desktopPath)

        let already = await exists(desktopPath + "mini_data2.txt")

        let contents = `
  Hi 👋,
  Thanks For choosing mini
  Its a simple and lightweight note taking app
  Made for you.
  You dont need to save the text
  mini does this automatically for you!
    
  Start Writing 🤗
        
        
        `
        if (!already) {
            console.log("file not exists. creating a new file")
            await writeTextFile("mini_data2.txt", contents, { dir: BaseDirectory.Desktop })
        }
        else {
            console.log("file exists")
            contents = await readTextFile('mini_data2.txt', { dir: BaseDirectory.Desktop });

            //

        }


        settextAreaInput(contents)
        // document.getElementById("textinput").value = contents;

    }


    useEffect(() => {
        check();
    }, [])

    const saveFile = async (text) => {

        console.log(textAreaInput);
        appWindow.setTitle("Saving..")
        setTimeout(function () {

            appWindow.setTitle("mini")
        }, 500)
        await writeTextFile("mini_data2.txt", text, { dir: BaseDirectory.Desktop })
        console.log("file saved...");
        console.log("new data", textAreaInput);
    }

    useEffect(() => {
        console.log('useeffet', textAreaInput);
        if (textAreaInput.length > 0)
            saveFile(textAreaInput)
    }, [textAreaInput])

    return (

        <div style={{ padding: 0, backgroundColor: '#C8E3BA' }}>
            <WindowControls showDrawer={showDrawer} />
            <TextArea
                style={{
                    height: '93vh',
                    border: 0,

                    backgroundColor: '#C8E3BA'



                }}
                value={textAreaInput} onChange={(e) => settextAreaInput(e.target.value)} placeholder="Enter something" />


            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}

            <Drawer

                style={{
                    backgroundColor: '#BADAA9', color: 'black'
                }}
                title="My Notes" placement="left" onClose={onClose} open={open}>

                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Input value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
                    <Button type="primary" onClick={(e) => handleNewNotes(e.currentTarget.value)}>Add Note</Button>
                </Space.Compact>
                <Divider orientation="left">Recent Notes</Divider>
                <List
                    style={{
                        // Adjust the maximum height as needed
                        overflowY: 'auto',


                    }}

                    itemLayout="horizontal"
                    dataSource={notesList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<EditTwoTone />}
                                title={<h3>{item}</h3>}

                            />
                        </List.Item>
                    )}
                />
            </Drawer>

        </div>
    )
}

export default App