'use client'

import { useState } from 'react'

import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { useForm } from 'react-hook-form'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useSnapFactoryCreateSnap, useSnapFactoryGetActiveSnaps } from '@/lib/blockchain'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'
import { toast } from '@/lib/hooks/use-toast'
import { GATEWAY_BASE } from '@/lib/ipfs'

type ContractURI = {
  name: string
  description: string
  image: string
  externalLink: string
  sellerFeeBasisPoints: string
  feeRecipient: string | `0x${string}`
}

type CreateMintableSnap = {
  name: string
  symbol: string
  contractURI: ContractURI
  tokenImageURL: string
  snapImageURL: string
  mintFee: any
  mintFeeRecipient: string | `0x${string}`
  creator: string | `0x${string}`
  salePrice: any
}

export default function CreateForm() {
  const [fileIpfsHash, setFileIpfsHash] = useState(``)
  const { handleSubmit, register, setValue } = useForm()

  const [newSnapDetails, setNewSnapDetails] = useState<CreateMintableSnap>()

  const account = useAccount()

  const contractFactory = useContractAutoLoad('SnapFactory')

  const { write, data, status, error } = useSnapFactoryCreateSnap({
    address: contractFactory?.address,
    args: [
      newSnapDetails?.name,
      newSnapDetails?.symbol,
      newSnapDetails?.contractURI,
      newSnapDetails?.tokenImageURL,
      newSnapDetails?.snapImageURL,
      newSnapDetails?.mintFee,
      newSnapDetails?.mintFeeRecipient,
      newSnapDetails?.creator,
      newSnapDetails?.salePrice,
    ],
    enabled: Boolean(newSnapDetails),
  })

  const { isLoading, isSuccess, isError, isFetched } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (!isLoading && isFetched && isSuccess) {
    toast({ id: 'CREATE_TOAST', title: 'CREATED SUCCESSFULLY 🎉', description: <p>Congrats! You made a Snap</p> }, 'CREATE_TOAST')
  } else if (!isLoading && isFetched && isError) {
    toast({ id: 'CREATE_ERROR_TOAST', title: '⛔ Error Creating ⛔' }, 'ERROR_TOAST')
  }

  /* configure Infura auth settings */
  const projectId = process.env.NEXT_PUBLIC_IPFS_ID
  const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

  /* Create an instance of the client */
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  })

  const onSubmit = (data: any) => {
    const contractURI: ContractURI = {
      name: data.name,
      description: data.description,
      image: `ipfs://${fileIpfsHash}`,
      externalLink: data.link,
      sellerFeeBasisPoints: '0',
      feeRecipient: account.address as `0x${string}`,
    }

    const newSnap: CreateMintableSnap = {
      name: data.name,
      symbol: data.symbol,
      contractURI: contractURI,
      tokenImageURL: contractURI.image,
      snapImageURL: contractURI.image,
      mintFee: ethers.utils.parseEther('0.0000092'),
      mintFeeRecipient: process.env.NEXT_PUBLIC_MINT_FEE_ADDRESS as `0x${string}`,
      creator: account.address as `0x${string}`,
      salePrice: ethers.utils.parseEther('0'),
    }

    if (data.price && data.price > 0) {
      newSnap.salePrice = ethers.utils.parseEther(data.price.toString())
    }

    setNewSnapDetails(newSnap)

    write?.()
  }

  const onImageUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) {
      toast({ id: 'ERROR_FILE', title: '⛔ Error With File ⛔' }, 'ERROR_FILE')
      return
    }

    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      toast({ id: 'ERROR_FILE_SIZE', title: '⛔ File Size Too Big ⛔', description: 'Must be less than 10MB' }, 'ERROR_FILE_SIZE')
      return
    }

    try {
      const added = await client.add(file)
      setFileIpfsHash(added.path)
    } catch (error) {
      console.log('Error uploading file: ', error)
      toast({ id: 'ERROR_FILE_IPFS', title: '⛔ Error with IPFS Upload ⛔', description: error?.message }, 'ERROR_FILE_IPFS')
    }
  }

  return (
    <div className="min-w-full rounded-md bg-neutral-100 p-4 text-center dark:bg-neutral-800">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Story Name (Max 32 Characters)
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="My Dog"
            required
            maxLength={32}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Symbol (Max 10 Characters)
          </label>
          <input
            {...register('symbol')}
            type="text"
            id="symbol"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="MYSTORY"
            required
            maxLength={10}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Description (Max 256 Characters)
          </label>
          <input
            {...register('description')}
            type="text"
            id="description"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Caption this"
            maxLength={256}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            External Link
          </label>
          <input
            {...register('link')}
            type="text"
            id="link"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="https://example.com"
            maxLength={64}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Collect Price in ETH (Leave blank for free)
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="text"
            id="price"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0.0000"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Image
          </label>
          <input
            {...register('image')}
            type="file"
            id="image"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            onChange={onImageUpload}
          />
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">600 x 600 images work best</p>
        </div>
        <div className="flex items-center justify-center">
          <input type="submit" className="btn bg-gradient-button btn-xl" value="Share Snap" />
        </div>
      </form>
      {fileIpfsHash && (
        <div className="card mt-2 flex items-center justify-center">
          <img src={GATEWAY_BASE + fileIpfsHash} width={600} alt="story image upload" />
        </div>
      )}
    </div>
  )
}
