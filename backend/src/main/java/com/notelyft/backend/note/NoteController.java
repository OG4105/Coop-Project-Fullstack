package com.notelyft.backend.note;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // GET one method
    @GetMapping("/{id}") //Finds by id
    public Note noteGetOne( @PathVariable Long id){
        return noteRepository.findById(id).orElseThrow(); // finds by ID, else throws an error
    }

    //Post create method
    @PostMapping
    public Note postNote( @RequestBody Note note){
        return noteRepository.save(note);
    }

    // Post DELETE method
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id){
        noteRepository.deleteById(id);
    }

    // Post PUT method
    @PutMapping("/{id}")
    public Note putNote(@PathVariable Long id, @RequestBody Note updatedNote) { // @updatedNote, New title/content user submits

        Note note = noteRepository.findById(id).orElseThrow(); // loads the real note, otherwise throw

        // change only the editable fields (Title and Content, Dates are NOT changable)
        note.setTitle(updatedNote.getTitle());
        note.setContent(updatedNote.getContent());
        // UpdateTimeStamp updates automatically, so it does get changed, just not here

        return noteRepository.save(note); // save the changes
    }

}
