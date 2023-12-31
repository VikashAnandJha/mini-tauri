import React, { useEffect } from 'react';
import { Button, Space } from 'antd';
import {
    CloseOutlined,
    MinusOutlined,
    ExpandOutlined,
    CompressOutlined,
    FileAddOutlined

} from '@ant-design/icons';
import { invoke, api } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window';

const WindowControls = ({ showDrawer }) => {

    const minimizeWindow = () => {
        appWindow.minimize()
    };

    const closeWindow = () => {
        appWindow.close()
    };

    const toggleFullscreen = async () => {
        appWindow.toggleMaximize()
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

                    alignSelf: 'center'
                }}>Note titile</div>
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