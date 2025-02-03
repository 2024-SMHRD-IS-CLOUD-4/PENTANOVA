package com.smhrd.ptnv.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.ptnv.service.BucketService;

import lombok.RequiredArgsConstructor;

@Controller  
@RequiredArgsConstructor  
@RequestMapping("/bucket")
public class BucketController {  
    private final BucketService fileService;  
  
    @PostMapping("/upload")  
    public ResponseEntity<Object> uploadFilesSample(@RequestPart(value = "files") List<MultipartFile> multipartFiles) {  
    	System.out.println(multipartFiles);
    	System.out.println("asdfasdf");
            return ResponseEntity  
                    .status(HttpStatus.OK)  
                    .body(fileService.uploadFiles(multipartFiles, "123123"));  
    }  
}
