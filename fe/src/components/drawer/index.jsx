import React from 'react';
import { Drawer } from 'antd';

function DrawerComponent({ title,width, style, onClose, visible, extra, children }) {
  return (
    <Drawer
      title={title}
      width={width}
      style={style}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={extra}
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
