import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { HexColorPicker } from "react-colorful";

const AddTodoModal = ({ open, handleClose, todos, setTodos, generateId }) => {
  const [color, setColor] = useState("#b32aa9");
  const [title, setTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    // Load todos from localStorage when component mounts
    const storedTodos = JSON.parse(localStorage.getItem("calenderTodoList")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever the todos state changes
    localStorage.setItem("calenderTodoList", JSON.stringify(todos));
  }, [todos]);

  const onAddTodo = () => {
    if (editingTodo) {
      // If editingTodo is set, update the existing todo
      const updatedTodos = todos.map((todo) => todo._id === editingTodo._id ? { ...todo, title, color } : todo);
      setTodos(updatedTodos);
      setEditingTodo(null);
    } else {
      // If not editing, add a new todos
      setTitle("");
      setTodos([
        ...todos,
        {
          _id: generateId(),
          color,
          title,
        },
      ]);
    }
  };

  const onEditTodo = (_id) => {
    const todoToEdit = todos.find((todo) => todo._id === _id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
      setTitle(todoToEdit.title);
      setColor(todoToEdit.color);
    }
  }

  const onDeleteTodo = (_id) => setTodos(todos.filter((todo) => todo._id !== _id));

  const onClose = () => {
    setEditingTodo("");
    setTitle("");
    setColor("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography variant='h6' fontWeight={600}>Add Todos</Typography>
        <Typography variant='caption' fontWeight={600}>
          Create todos to add to your Calendar.
        </Typography>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          <TextField
            name="title"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            sx={{ mb: 6 }}
            required
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <HexColorPicker color={color} onChange={setColor} style={{ width: 270, height: 200 }} />
            <Box
              sx={{ height: 50, width: 50, borderRadius: 0.9, ml: 3, backgroundColor: color }}
              className="value"
            ></Box>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {todos.map((todo) => (
                <ListItem
                  key={todo.title}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => onEditTodo(todo._id)} edge="end" color="default">
                        <PencilOutline />
                      </IconButton>
                      <IconButton onClick={() => onDeleteTodo(todo._id)} color="error" edge="end">
                        <DeleteOutline />
                      </IconButton>
                    </>
                  }
                >
                  <Box
                    sx={{ height: 20, width: 20, borderRadius: 0.4, marginRight: 2 }}
                    className="value"
                    style={{ backgroundColor: todo.color }}
                  ></Box>
                  <ListItemText primary={todo.title} sx={{ textTransform: "capitalize" }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <DialogActions>
        <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button
          size='large'
          type='submit'
          sx={{ mr: 2 }}
          variant='contained'
          disabled={title === "" || color === ""}
          onClick={() => onAddTodo()}
        >
          {editingTodo ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoModal;