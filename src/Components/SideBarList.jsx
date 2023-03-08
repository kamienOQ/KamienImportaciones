import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';

export const SideBarList = () => {
  return (
    <List>
        <Link to = "/Administradores" style={{textDecoration:"None",color:"white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GroupAddIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Administrador"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>


        <Link to = "/Producto" style={{textDecoration:"None",color:"white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Producto"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
        
        <Link to = "/Categorias" style={{textDecoration:"None",color:"white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Categoría"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
                  

        <Link to = "/About" style={{textDecoration:"None",color:"white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Añadir Acerca De"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>

        <Link to = "/Perfil" style={{textDecoration:"None",color:"white"}}>
        <ListItem key= "Añadir Usuario Administrador" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ManageAccountsIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Configurar Cuenta"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
        </ListItem>
        </Link>
    </List>
  )
}
