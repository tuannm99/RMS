import React from 'react';
import { Drawer, Space, Button } from 'antd';

function DrawerComponent({ title, onClose, visible, children }) {
  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
