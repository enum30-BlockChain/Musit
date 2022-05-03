# **ENUM30 x Musit**
> 기업협약 프로젝트
이더리움 기반 NFT 음원 스트리밍 플랫폼 개발


![image](https://user-images.githubusercontent.com/89626182/166390125-b8d7194d-c992-4af3-a51c-fa0255e8df22.png)

### [Notion](https://charm-locust-333.notion.site/MUSIT-x-ENUM30-b1ec2ceb78fa4f539fcf58ef37e48605)

### 기간 : `2022-03-08 ~ 2022-05-02`

### 팀원 및 역할

- [Haemin Park](https://github.com/euphratesriver0216) : UI/UX 설계, 디자인 총괄
    
- [Seokhun Yoon](https://github.com/imysh578) : 스마트 컨트랙트, 리덕스
    
- [Cheolsoon Lim](https://github.com/POcodingWER) : 음원 스트리밍 서비스, 음원 검색 및 추천 알고리즘
    
- [Jin-young Jeon](https://github.com/jeonjinoung) : 회원가입, 서버 설계

***


# 목차
[1. 개요](#개요)
[2. 사용한 기술](#사용한-기술)
[3. 상세 설명](#상세-설명)
[4. 이슈 관리](#이슈-관리)


***

## 📒 개요
### 1. 목적
이더리움 기반 NFT와 음원 스트리밍 서비스를 결합한 플랫폼 개발
<img src="https://user-images.githubusercontent.com/33863016/166393797-1facd03f-8e1c-47ef-81f3-eed69ae89bb0.png"/>

### 2. 주요기능
#### 1) 구독권
- 구독권 구매 후 음원 청취 가능
- 최초 가입자 30일 무료 쿠폰 지급

#### 2) 음원 스트리밍 서비스
- 음원 등록
- 하단 플레이바를 통해 청취
- 상단바 검색 기능

#### 3) NFT 발행
- 등록된 음원을 NFT로 발행
- `ERC721` 규격 사용

#### 4) 거래소
- NFT 일반판매
- English Auction




***

## ⚙ 사용한 기술
<div> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=MUI&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white"/>
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/IPFS-65C2CB?style=flat-square&logo=IPFS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=Linux&logoColor=white"/>
  <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/>
  <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=flat-square&logo=Ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/Hardhat-FFF100?style=flat-square&logo=Hardhat&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ethers.js-2535A0?style=flat-square&logo=Ethers.js&logoColor=white"/>
</div>



### 💻 Deploy
- `AWS EC2` : deploy
- `nginx` : client
- `pm2` : server

### ⛓ Blockchain
- `Hardhat`
- `ethers.js`
- `Alchemy`



### 🧪 Test-tool
- `Mocha`
- `Chai`

### 📢 For Team Communication

- `Discord`
- `Notion`
- `Github`
- `Teams`

***

## ⚙ 상세 설명
### API 정의서
[Docs Link](https://charm-locust-333.notion.site/API-Docs-8b91a8fb6ec64385b2980b1fb9b4d904)
<img width="100%" alt="스크린샷 2021-10-15 오후 3 51 02" src="https://user-images.githubusercontent.com/89626182/166393019-15a2bc67-d164-4069-bb0b-60d42dc17888.png">

### 기능 명세서
[Docs Link](https://charm-locust-333.notion.site/Page-Functional-specification-61a617b23e1b471d83ab4fb8f5d347b1)
<img width="100%" alt="스크린샷 2021-10-15 오후 3 51 02" src="https://user-images.githubusercontent.com/89626182/166393038-9e9a1667-c5b5-44f9-9dda-50cc34971428.png">
### DB 테이블 관계도
![DB EER Diagram](https://user-images.githubusercontent.com/89626182/166389973-e636ed03-2881-4d57-9e86-1e20a606166c.png)


## 🤬 이슈 관리
- 발생한 이슈는  Github Issue에서 관리
[Go to Github Issue](https://github.com/enum30-BlockChain/Musit/issues)
<img width="100%" src="https://user-images.githubusercontent.com/33863016/166393283-2e4f8e93-8cc8-468d-8f74-d84c23625951.png">
<img width="50%" src="https://user-images.githubusercontent.com/33863016/166393369-dcf981b5-da08-44d6-b65b-9ccd485f8887.png">
<img width="50%" src="https://user-images.githubusercontent.com/33863016/166393417-c01654ba-6d55-480b-86c0-8682f6ba6cad.png">
