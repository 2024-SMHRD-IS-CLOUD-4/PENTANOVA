package com.smhrd.ptnv.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.smhrd.ptnv.model.BucketFileDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BucketService {

	private final AmazonS3Client amazonS3Client;

	@Value("${spring.s3.bucket}")
	private String bucketName;

	@Value("${file.upload-dir}")
	private String uploadDir;

	public String getUuidFileName(String fileName) {
		String ext = fileName.substring(fileName.indexOf(".") + 1);
		return UUID.randomUUID().toString() + "." + ext;
	}

	public List<BucketFileDto> uploadFilesSample(List<MultipartFile> multipartFiles) {

		return uploadFiles(multipartFiles, "sample-folder");
	}

	// NOTICE: filePath의 맨 앞에 /는 안붙여도됨. ex) history/images
	public List<BucketFileDto> uploadFiles(List<MultipartFile> multipartFiles, String filename) {
		
		List<BucketFileDto> s3files = new ArrayList<>();

		for (MultipartFile multipartFile : multipartFiles) {

			String originalFileName = multipartFile.getOriginalFilename();
			String uploadFileName = filename+".png";
			String uploadFileUrl = "";

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(multipartFile.getSize());
			objectMetadata.setContentType(multipartFile.getContentType());

			try (InputStream inputStream = multipartFile.getInputStream()) {

				String keyName = "HisDiagnosis/" + uploadFileName;
				System.out.println(keyName);
				amazonS3Client.putObject(new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
						.withCannedAcl(CannedAccessControlList.PublicRead));

				uploadFileUrl = "https://kr.object.ncloudstorage.com/" + bucketName + keyName;
			} catch (IOException e) {
				e.printStackTrace();
			}

			s3files.add(BucketFileDto.builder().originalFileName(originalFileName).uploadFileName(uploadFileName)
					.uploadFilePath("/HisDiagnosis").uploadFileUrl(uploadFileUrl).build());
		}
		return s3files;
	}

	public S3ObjectInputStream getImages(String path) {
		System.out.println(path);
		S3Object s3Object = amazonS3Client.getObject(bucketName, path);
		S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();
		return s3ObjectInputStream;
	}
}