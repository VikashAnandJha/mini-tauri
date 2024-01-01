import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import {
    CloseOutlined,
    MinusOutlined,
    ExpandOutlined,
    CompressOutlined,
    FileAddOutlined

} from '@ant-design/icons';
//import { appWindow } from '@tauri-apps/api/window'
const WindowControls = ({ showDrawer, noteTitle }) => {

    const [appWindow, setAppWindow] = useState()

    // Import appWindow and save it inside the state for later usage
    async function setupAppWindow() {

        const appWindow = (await import('@tauri-apps/api/window')).appWindow
        setAppWindow(appWindow)

    }

    useEffect(() => {
        setupAppWindow()
    }, [])

    const minimizeWindow = () => {
        appWindow.minimize()
    };

    const closeWindow = () => {
        appWindow.close()
    };

    const toggleFullscreen = async () => {
        appWindow.toggleMaximize()

        console.log(await appWindow.theme())



    };

    return (

        <div
            className="titlebar"
            data-tauri-drag-region
            style={{
                margin: 0,
                padding: 0,
                display: 'flex', flexDirection: 'row',

                alignItems: 'flex-end',
                alignContent: 'flex-end',

                backgroundColor: '#BADAA9'


            }}>
            <Button style={{

                border: 0, backgroundColor: '#BADAA9', color: 'black'
            }} className="titlebar-button" icon={<FileAddOutlined />} onClick={showDrawer} />

            <div
                className="title-text"
                data-tauri-drag-region
                style={{
                    flexGrow: 1,

                    alignSelf: 'center',
                    fontSize: 10
                }}>{noteTitle}</div>
            <div className='class="titlebar-menu"'>
                <Space.Compact
                    style={{

                    }}
                >

                    <Button style={{
                        border: 0, backgroundColor: '#BADAA9', color: 'black'
                    }} className="titlebar-button" onClick={minimizeWindow} icon={<MinusOutlined />} />
                    <Button style={{
                        border: 0, backgroundColor: '#BADAA9', color: 'black'
                    }} className="titlebar-button" onClick={toggleFullscreen} icon={<ExpandOutlined />} />

                    <Button style={{
                        border: 0, backgroundColor: '#BADAA9', color: 'black'
                    }} className="titlebar-button" onClick={closeWindow} icon={<CloseOutlined />} />
                </Space.Compact>
            </div>
        </div>
    );
};

export default WindowControls;