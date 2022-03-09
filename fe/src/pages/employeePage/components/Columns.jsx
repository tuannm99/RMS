import moment from 'moment';
import { Popconfirm, Space, Button } from 'antd';

export default ({ edit, delteSt }) => {
  return [
    {
      title: 'Employee',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '_Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Update By',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record.id)}>Edit</Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => delteSt(record.id)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
