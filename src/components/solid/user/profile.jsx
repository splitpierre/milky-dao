// import { createSignal, createResource } from "solid-js";
import { useStore } from "nanostores-persistent-solid";
import {
  fetchUser,
  genApiKey,
  newUserNonce,
  storeUser,
  walletSelected,
} from "~/stores/walletStore";
import TextField from "@suid/material/TextField";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemButton from "@suid/material/ListItemButton";
import ListItemIcon from "@suid/material/ListItemIcon";
import ListItemText from "@suid/material/ListItemText";
import ListSubheader from "@suid/material/ListSubheader";
import ArticleIcon from "@suid/icons-material/Article";
import AssignmentIndIcon from "@suid/icons-material/AssignmentInd";
import Paper from "@suid/material/Paper";
import Divider from "@suid/material/Divider";
import Stack from "@suid/material/Stack";

export default function ProfilePage() {
  fetchUser();
  const user = useStore(storeUser);
  const wallet = useStore(walletSelected);
  const nonce = useStore(newUserNonce);
  return (
    <div class="w-full">
      <Box
        component="form"
        sx={{
          textAlign: "center",
        }}
        noValidate
        autocomplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          fullWidth
          value={user().address}
          disabled
          margin="normal"
        />
        <Stack
          spacing={2}
          direction="row"
          sx={{ "& button": { mt: "14px !important" } }}
        >
          <TextField
            id="outlined-basic"
            label="API Key"
            variant="outlined"
            margin="normal"
            value={user().apiKey}
            disabled
            fullWidth
          />
          <Button
            variant="contained"
            size="small"
            class="w-40 h-14 "
            onClick={async () => await genApiKey()}
          >
            {/* {user().apiKey ? "Copy" : "New Key"} */}
            New Key
          </Button>
        </Stack>

        <TextField
          id="outlined-basic"
          label="Created At"
          variant="outlined"
          fullWidth
          value={user().createdAt}
          disabled
          margin="normal"
        />
      </Box>
      <Paper
        elevation={3}
        sx={{
          mb: 3,
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" id="roles-list-subheader">
              Roles
            </ListSubheader>
          }
        >
          {user() &&
            user().roles &&
            JSON.parse(user().roles).map(({ id, name }) => (
              <ListItem>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${name}`}
                  secondary={`Role ID: ${id} `}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
      <Divider variant="middle" />
      <Paper
        elevation={3}
        sx={{
          mb: 3,
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" id="projects-list-subheader">
              Projects
            </ListSubheader>
          }
        >
          {JSON.parse(user().projects).map(
            ({ id, title, createdAt, iconImage }) => (
              <ListItem
                component="a"
                href="#"
                onClick={() => {
                  window.location.href = `/project/${id}`;
                }}
              >
                <ListItemIcon>
                  <img src={iconImage} alt={title} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary={`${title}`}
                  secondary={`Project: ${id} - Submitted: ${createdAt}`}
                />
              </ListItem>
            )
          )}
        </List>
      </Paper>
      <Divider variant="middle" />
      <Paper
        elevation={3}
        sx={{
          mb: 3,
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" id="proposals-list-subheader">
              Proposals
            </ListSubheader>
          }
        >
          {JSON.parse(user().proposals).map(
            ({ id, title, createdAt, projectId }) => (
              <ListItem
                component="a"
                href="#"
                onClick={() => {
                  window.location.href = `/proposal/${id}`;
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${title}`}
                  secondary={`Project: ${projectId} - Submitted: ${createdAt}`}
                />
              </ListItem>
            )
          )}
        </List>
      </Paper>
      <Divider variant="middle" />
      <Paper elevation={10}>
        <Box
          component="form"
          sx={{
            textAlign: "center",
            m: 2,
            p: 3,
          }}
          noValidate
          autocomplete="off"
        >
          <h4>Debug</h4>
          <TextField
            id="outlined-basic"
            label="Selected Wallet"
            variant="outlined"
            fullWidth
            value={wallet()}
            disabled
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Access Token"
            variant="outlined"
            fullWidth
            value={user().authToken}
            disabled
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="User ID"
            variant="outlined"
            fullWidth
            value={user().id}
            disabled
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Nonce"
            variant="outlined"
            fullWidth
            value={nonce()}
            disabled
            margin="normal"
          />
        </Box>
      </Paper>
    </div>
  );
}
