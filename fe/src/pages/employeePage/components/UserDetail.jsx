import React from 'react';
import { DrawerComponent } from '../../../components';
function UserDetail({ onclose, visible, user }) {
  return (
    <DrawerComponent
      title="Information employee"
      onClose={onclose}
      visible={visible}
    >
      <h1>{user.email}</h1>
    </DrawerComponent>
  );
}

export default UserDetail;
