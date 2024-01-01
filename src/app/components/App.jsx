'use client'
import { List, Space, Input, Button, Avatar, Divider, Flex, Radio, Drawer, message, Result, Empty } from 'antd'
import React, { useEffect, useState } from 'react'

import {
    EditTwoTone
} from '@ant-design/icons';
import WindowControls from './WindowControls'

import { createDir, BaseDirectory, existsSync, writeTextFile, exists, readTextFile } from '@tauri-apps/api/fs';

import { DEFAULT_FILE_NAME, DEFAULT_CONTENT } from './Config'
import TextArea from 'antd/es/input/TextArea';
import VirtualList from 'rc-virtual-list';

function App() {
    const [notesList, setNotesList] = useState([])
    const [currentTitle, setCurrentTitle] = useState('')
    const [open, setOpen] = useState(false);
    const [selectedNote, setselectedNote] = useState({})
    const [textAreaInput, settextAreaInput] = useState('')
    const [desktopDir, setDesktopDir] = useState(null);

    const [newNoteTitle, setnewNoteTitle] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        // Dynamically import desktopDir
        import('@tauri-apps/api/path').then((pathModule) => {
            const { desktopDir } = pathModule;
            // Set the desktopDir in the state
            setDesktopDir(desktopDir);
        });
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    const fileError = (e) => {
        console.log(e)
        messageApi.open({
            type: 'error',
            content: 'mini storage file is corupted. Delete(Desktop/miniData.txt) ',
        });
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleNewNotes = () => {

        if (!(newNoteTitle.length > 0)) return;

        // Find the max id using reduce
        const maxId = notesList.reduce((max, book) => (book.id > max ? book.id : max), 0);

        console.log("Maximum ID:", maxId);

        const dataToInsert = { id: maxId + 1, title: newNoteTitle, content: 'Write something about ' + newNoteTitle }
        console.log('data to insert', dataToInsert)
        setNotesList((prevNotesList) => [dataToInsert, ...prevNotesList]);
        // // Clear the input field after adding a note
        setnewNoteTitle('');

        console.log(notesList);

        handleNoteSelection(dataToInsert)

    }

    async function check() {
        import('@tauri-apps/api/path').then(async (pathModule) => {
            const { desktopDir } = pathModule;
            // Now you can use desktopDir here
            console.log(desktopDir());

            try {
                const desktopPath = await desktopDir()

                console.log(desktopPath)

                let already = await exists(desktopPath + DEFAULT_FILE_NAME)

                let contents = JSON.stringify(DEFAULT_CONTENT)
                if (!already) {
                    console.log("file not exists. creating a new file")
                    await writeTextFile(DEFAULT_FILE_NAME, JSON.stringify(DEFAULT_CONTENT), { dir: BaseDirectory.Desktop })
                }
                else {
                    console.log("file exists")
                    contents = await readTextFile(DEFAULT_FILE_NAME, { dir: BaseDirectory.Desktop });

                }

                setNotesList(JSON.parse(contents))
                let notesJson = JSON.parse(contents)

                if (notesJson.length > 0) {
                    console.log(notesJson[0])
                    setselectedNote(notesJson[0])
                    console.log(selectedNote)

                    setCurrentTitle(notesJson[0].title)
                    settextAreaInput(notesJson[0].content)
                } else {

                }
            } catch (e) {
                fileError(e)

            }

        });



    }



    // Function to update the title and content of a book by id
    function updateBookById(id, newTitle, newContent) {
        let books = notesList;
        const index = books.findIndex(book => book.id === id);

        if (index !== -1) {
            // Update title and content if the book with the given id is found
            books[index].title = newTitle;
            books[index].content = newContent;
            console.log(`Book with id ${id} updated successfully.`);
        } else {
            console.log(`Book with id ${id} not found.`);
        }


        setNotesList(books)
    }



    useEffect(() => {

        check();
    }, [])

    const saveFile = async (text) => {

        updateBookById(selectedNote.id, selectedNote.title, text);
        setNotesList((prevNotesList) => [...prevNotesList]);


        console.log(textAreaInput);
        // appWindow.setTitle("Saving..")
        // setTimeout(function () {

        //     appWindow.setTitle("mini")
        // }, 500)
        await writeTextFile(DEFAULT_FILE_NAME, JSON.stringify(notesList), { dir: BaseDirectory.Desktop })
        console.log("file saved...");
        console.log("new data", textAreaInput);
    }

    useEffect(() => {
        console.log('useeffet', textAreaInput);
        if (textAreaInput.length > 0)
            saveFile(textAreaInput)
    }, [textAreaInput])



    const handleNoteSelection = (item) => {
        setCurrentTitle(item.title)
        setselectedNote(item)
        settextAreaInput(item.content)
        onClose()
        console.log(selectedNote)
    }

    return (

        <div style={{ padding: 0, backgroundColor: '#C8E3BA' }}>
            {contextHolder}
            <WindowControls noteTitle={currentTitle} showDrawer={showDrawer} />

            {notesList.length == 0 && <div style={{ padding: 15 }}>

                <Empty
                    image={<img src={`./mini_logo.png`} alt="Logo" />}

                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span>
                            Welcome to <b>mini</b>

                            <div>  A simple note-taking app which works in offline mode.
                                <span> MINI is open-source
                                </span>
                            </div>


                        </span>
                    }
                >
                    <Button type="primary" onClick={() => setOpen(true)}>New Note</Button>
                </Empty>
            </div>}

            {
                notesList.length > 0 &&


                <TextArea
                    style={{
                        height: '93vh',
                        border: 0,

                        backgroundColor: '#C8E3BA'



                    }}
                    value={textAreaInput} onChange={(e) => settextAreaInput(e.target.value)} placeholder="Enter something" />


            }





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
                    <Input style={{
                        backgroundColor: '#EAEAAe', color: 'black'
                    }} placeholder='Enter note title' value={newNoteTitle} onChange={(e) => setnewNoteTitle(e.target.value)} />
                    <Button type="primary" onClick={(e) => handleNewNotes(e.currentTarget.value)}>+</Button>
                </Space.Compact>
                <Divider orientation="left">Recent Notes</Divider>
                <List>
                    <VirtualList
                        data={notesList}
                        height={300}
                        itemHeight={47}


                    >
                        {(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<EditTwoTone />}
                                    title={item.title}
                                    onClick={() => handleNoteSelection(item)}

                                />
                            </List.Item>
                        )}
                    </VirtualList>
                </List>

            </Drawer>

        </div >
    )
}

export default App