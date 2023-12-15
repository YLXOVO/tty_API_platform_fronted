import {
  ProColumns,
  ProTable
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Modal} from "antd";


//表示要接收什么参数
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { visible,columns,onCancel,onSubmit } = props;

  return <Modal visible={visible} onCancel={() =>onCancel?.()}>
    <ProTable
      type="form"
      columns={columns}
      onSubmit={async (value) => {
        onSubmit?.(value);
      }}
    />
  </Modal>
};
export default CreateModal;

