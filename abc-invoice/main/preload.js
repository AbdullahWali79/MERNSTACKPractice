const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  listInvoices: () => ipcRenderer.invoke('invoices:list'),
  addInvoice: (invoice) => ipcRenderer.invoke('invoices:add', invoice),
  updateInvoice: (invoice) => ipcRenderer.invoke('invoices:update', invoice),
  deleteInvoice: (id) => ipcRenderer.invoke('invoices:delete', id),
}); 