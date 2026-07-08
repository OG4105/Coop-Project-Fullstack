package com.notelyft.backend.note;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notes") // Base URL for every method in this class
public class NoteController {
    
    private final NoteRepository noteRepository; //Slot to hold the Repository

    public NoteController(NoteRepository noteRepository) { //Spring passes Note repo here
        this.noteRepository = noteRepository;
    }


    // GET all method
    @GetMapping
    public List<Note> noteGetAll(){
        return noteRepository.findAll();
    }

    //Post create method
    @PostMapping
    public Note postNote( @RequestBody Note note){
        return noteRepository.save(note);
    }

}
