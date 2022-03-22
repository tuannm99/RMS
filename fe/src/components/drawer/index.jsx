import React from 'react';
import { Drawer } from 'antd';

function DrawerComponent({
  title,
  width,
  closeable,
  bodyStyle,
  onClose,
  visible,
  extra,
  children,
}) {
  return (
    <Drawer
      title={title}
      width={width}
      onClose={onClose}
      visible={visible}
      closable={closeable}
      bodyStyle={bodyStyle}
      extra={extra}
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
